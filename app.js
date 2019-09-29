var express = require('express'); //Node JS framework for web based applications
var rp = require('request-promise'); //To send request to third party servers
var convert = require('xml-js'); //To convert XML to JSON

var SparqlParser = require('./utils//sparql-parser/sparql').Parser;
var sparkParser = new SparqlParser(); // To parse SparQL queries and extract columnames, aggregations, where clause, etc.

var app = express();//Creating an app using express

app.use(express.static('client')); //Files can be directly accessed from client/browser. Client side files like HTML, CSS, JS will be placed here.

app.get("/chartType", (req, res) => {
    // To get chart type, x-axis, y-axis based on column names sent from the client
    // From nodejs, python file is executed using shell command (spawn)
    // the python classifier returns the data in the format chartType(X,Y) from which we extract data and send it to the client.
    try {
        var colNames = req.query.colNames ? req.query.colNames.split(",") : [];
        var spawn = require("child_process").spawn;
        var process = spawn('python', ["./Graph_predict.py"].concat(colNames));
        process.stdout.on('data', function (data) {
            data = data.toString().replace(")", "").replace("[", "").replace("]", "");
            data = data.split("(");
            var type = data[0].trim().replace(/[^a-zA-Z]/g, "").toLowerCase();
            var axes = data[1].split(",");
            console.log("axes:::", axes);
            var resultObj = { type };
            for (var i = 0; i < axes.length; i++) {
                var curAxes = axes[i].trim();
                if (curAxes.indexOf("x-axis") == -1 && curAxes.indexOf("y-axis") == -1) {
                    var parts = curAxes.split("=");
                    if (parts.length > 1) {
                        if (parts[1].indexOf(";") == -1) {
                            resultObj[parts[0]] = parts[1].trim().replace(/[^a-zA-Z]/g, "");
                        } else {
                            resultObj[parts[0]] = parts[1].split(";").map(obj => obj.trim().replace(/[^a-zA-Z]/g, ""));
                        }
                    }
                }
            }
            res.status(200).send(resultObj);
        });
        process.stderr.on('data', function (err) {
            console.log("Error in executing python shell:", err.toString())
            throw new Error("Error in executing python shell");
        });
    } catch (ex) {
        console.log("Error happened in chartType:", ex);
        res.status(500).send({ error: "unable to get chart type" });
    }
});

function extractColumnsFromTheGivenQuery(query) {
    query = query.toLowerCase();
    var startIndex = query.indexOf("select");
    var endIndex = query.indexOf(" where");
    var columns = query.slice(startIndex + 6, endIndex).split(" ");
    columns = columns.filter(str => str.trim() && str.indexOf("?") != -1);
    var filteredCols = [];
    for (var i = 0; i < columns.length;) {
        var str = columns[i].replace("?", "").replace(/xsd:.*[a-zA-Z0-9]/g, "").trim();
        if (str == "as") {
            i = i + 2;
            continue;
        }
        str = str.replace(/[^a-zA-Z]/g, "")
        filteredCols.push(str);
        i++;
    }
    filteredCols = filteredCols.filter(str => str.trim());
    console.log("columns::", filteredCols);
    return filteredCols;
}

app.get("/parseQuery", (req, res) => {
    // Gets the query from the client.
    // Parses the query using the sparkParser and returns columnames, aggregations, where clause, etc to the client
    var query = req.query.query;
    try {
        var parsedQuery = sparkParser.parse(query);
        res.send(parsedQuery);
    } catch (ex) {
        console.log("Error happened in parseQuery:", ex);
        var cols = extractColumnsFromTheGivenQuery(query);
        res.send({ error: "true", cols });
    }
});

app.get("/queryResult", async (req, res) => {
    // Gets the query from client
    // Send request to SPARQL Endpoint and receives the XML response.
    // For Standard queries, noParse will be true => XML response is sent as such to client.
    // For Custom queries, noParse will be undefined => XML response is converted to JSON and sent to client.
    // This is done to avoid rework for existing standard queries. However this should be migrated to single flow soon.
    var query = req.query.query;
    var noParse = req.query.noParse;
    var options = {
        method: 'GET',
        uri: `http://kddste.sda.tech/sparql?default-graph-uri=&query=${encodeURIComponent(query)}`,
        headers: {}
    };
    try {
        var reqResults = await rp(options);
        var formattedResult = reqResults;
        if (!noParse) {
            var response = convert.xml2json(reqResults, { compact: true, spaces: 4 });
            response = JSON.parse(response);
            var results = response.sparql.results.result || [];
            if (!(results instanceof Array)) {
                results = [results]
            }
            formattedResult = [];
            results.forEach(obj => {
                var formattedObj = {};
                obj.binding.forEach(obj1 => {
                    //console.log("obj1:::",JSON.stringify(obj1));
                    var value = obj1.literal ? obj1.literal._text : obj1.uri._text;
                    var splitValue = value.split("#");
                    value = splitValue.length > 1 ? splitValue[1] : value;
                    value = value.replace(`http://purl.org/seo#`, "");//field
                    value = value.replace(`http://purl.org/seo/`, "");//field
                    value = value.replace(`http://w3id.org/EVENTSKG-Dataset/ekg#`, "");//series
                    value = value.replace(`http://dbpedia.org/resource/`, "");//country
                    formattedObj[obj1._attributes.name] = isNaN(value) ? value : Number(value);
                });
                formattedResult.push(formattedObj);
            });
        }
        res.send(formattedResult);
    } catch (ex) {
        console.log("Error happened in queryResult:", ex);
        res.status(500).send({ error: "server error" });
    }
});


app.listen(4800, () => {
    // App is listening in port 4800
    // In browser, hit http://localhost:4800 to view the app
    // Start server using node app.js
    // Ensure another server is not running in port 4800
    console.log("Server running in 4800");
})