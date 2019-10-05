function drawCustomTreeChart(algoResult, sparqlResults, colResults) {
    var rootNode = algoResult.x && sparqlResults[0][algoResult.x] ? (nameMapping[sparqlResults[0][algoResult.x]] || sparqlResults[0][algoResult.x]) : "Root";
    var treeData = {
        "name": rootNode,
        "children": []
    };
    var childNodeLabelsObj = {};;
    sparqlResults.forEach(data => {
        var eventLink = "";
        if (algoResult.link && data[algoResult.link]) {
            eventLink = data[algoResult.link];
            if (eventLink.indexOf("http://") == -1 && eventLink.indexOf("https://") == -1) {
                eventLink = `http://${eventLink}`;
            }
            eventLink = ` (<a href="${eventLink}" target="_blank">Link</a>)`;
        }
        var requiredCol = data[algoResult.y];
        var indexToPut = 0;
        if (childNodeLabelsObj[requiredCol] != undefined) {
            indexToPut = childNodeLabelsObj[requiredCol];
        } else {
            treeData.children.push({ name: requiredCol, children: [] });
            indexToPut = treeData.children.length - 1;
            childNodeLabelsObj[requiredCol] = indexToPut;
        }
        treeData.children[indexToPut].children.push({ name: `${data[algoResult.label]}${eventLink}` });
    });
    drawTreeChart(treeData);
}

function drawCustomLollipopChart(algoResult, sparqlResults, colResults) {
    var loliData = [];
    var maxVal = -Infinity, minVal = Infinity;
    sparqlResults.forEach((obj, i) => {
        var count = obj[algoResult.y];
        if (count > maxVal) {
            maxVal = count;
        }
        if (count < minVal) {
            minVal = count;
        }
        loliData.push({
            Country: obj[algoResult.x],
            Value: count
        })
    });
    drawSingleLoliPop(loliData, maxVal, algoResult.y, algoResult.x);
}

function drawCustomBarChart(algoResult, sparqlResults, colResults) {
    var graphData = [];
    var yLabel;
    sparqlResults.forEach(obj => {
        var tempIntVal;
        for (var key in obj) {
            obj[key.toLowerCase()] = obj[key];
            if (tempIntVal == undefined && !isNaN(obj[key])) {
                tempIntVal = obj[key];
                yLabel = key;
            }
        }
        var xVal = obj[algoResult.x.toLowerCase()].replace("_", " ");
        if (algoResult.data_type == "date") {
            var dateVal = new Date(xVal);
            if (algoResult.plot == "year") {
                xVal = String(dateVal.getFullYear());
            } else {
                xVal = `${dateVal.getFullYear()}-${dateVal.getMonth() + 1}-${dateVal.getDate()}`;
            }
        }
        var yVal = null;
        if (obj[algoResult.y.toLowerCase()] != undefined) {
            yVal = obj[algoResult.y.toLowerCase()];
            yLabel = algoResult.y;
        } else {
            yVal = tempIntVal;
        }
        graphData.push({
            "over": xVal,
            "2614": yVal,
            "4449": 0
        });
    });
    $("#chart_area").empty();
    var columnsInfo = { "2614": "Count", "4449": "" };
    var barChartConfig = {
        mainDiv: "#chart_area",
        colorRange: ["#008000", "#0000A0"],
        data: graphData,
        columnsInfo: columnsInfo,
        xAxis: "runs",
        yAxis: "over",
        label: {
            xAxis: yLabel,
            yAxis: algoResult.x
        }
    };
    new horizontalGroupBarChart(barChartConfig);
}

function drawCustomColumnChart(algoResult, sparqlResults, colResults) {
    var graphD = [];
    sparqlResults.forEach(obj => {
        for (var key in obj) {
            obj[key.toLowerCase()] = obj[key];
        }
        var xVal = nameMapping[obj[algoResult.x.toLowerCase()]] || obj[algoResult.x.toLowerCase()];
        graphD.push({ salesperson: xVal, sales: obj[algoResult.y.toLowerCase()] })
    });
    drawBarChart(graphD, algoResult.x, algoResult.y);
}

function drawCustomCountryChart(algoResult, sparqlResults, colResults) {
    var flatArray = [];
    var countryList = returnCountryIds();
    sparqlResults.forEach(data => {
        for (var x in data) {
            data[x.toLowerCase()] = data[x];
        }
        var series = data[algoResult.label.toLowerCase()];
        var country = data[algoResult.x.toLowerCase()].replace("_", " ");
        var count = data[algoResult.y.toLowerCase()];
        flatArray.push({ country: country, series: series, count: count });
    });
    flatArray = flatArray.map(data => {
        var countryObj = countryList.find(con => con.name.indexOf(data.country) != -1);
        data.id = countryObj && countryObj.id;
        data.population = data.count;
        data.name = data.country;
        return data;
    });
    drawCountryGraph(flatArray);
}

function drawCustomMultilineChart(algoResult, sparqlResults, colResults) {
    var graphData = [
        {
            name: algoResult.y[0],
            values: []
        },
        {
            name: algoResult.y[1],
            values: []
        }
    ];
    var dateArr = [];
    sparqlResults.forEach((obj, index) => {
        for (var x in obj) {
            obj[x.toLowerCase()] = obj[x];
        }
        var xVal = obj[algoResult.x].replace("_", " ");
        if (algoResult.data_type == "date") {
            var dateVal = new Date(xVal);
            if (algoResult.plot == "year") {
                xVal = String(dateVal.getFullYear());
            } else {
                xVal = `${dateVal.getFullYear()}-${dateVal.getMonth() + 1}-${dateVal.getDate()}`;
            }
        }
        dateArr.push(xVal);
        graphData[0].values.push({ date: index, price: obj[algoResult.y[0]] });
        graphData[1].values.push({ date: index, price: obj[algoResult.y[1]] });
    });
    constructLineGraph(graphData, "chart_area");
    var gElements = $("#chart_area").find("g").find("g[class='x axis']").find("g");
    var len = gElements.length - 1;
    for (var loop = dateArr.length - 1; loop >= 0; loop-- , len--) {
        $(gElements[len]).find("text").text(dateArr[loop]);
    }
}

function drawCustomHeatMapChart(algoResult, sparqlResults, colResults) {
    var inputData = [];
    var seriesList = {};
    sparqlResults.forEach((obj, i) => {
        for (var x in obj) {
            obj[x.toLowerCase()] = obj[x];
        }
        var event = obj[algoResult.x.toLowerCase()].replace("_", " ");
        var sDate = new Date(obj[algoResult.y.toLowerCase()]);
        var month = sDate.getMonth();
        var year = sDate.getFullYear();
        if (!seriesList["" + year]) {
            seriesList["" + year] = [];
            for (var i = 1; i < 13; i++) {
                seriesList["" + year].push({ day: year, hour: i, value: 0 });
            }
        }
        seriesList["" + year][month].value += 1;
    });
    var keys = Object.keys(seriesList).sort();
    keys.forEach((key, index) => {
        seriesList[key] = seriesList[key].map(d => {
            d.index = index;
            return d;
        })
        inputData = inputData.concat(seriesList[key]);
    });
    var times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    drawHourHeatMap(inputData, keys, times);
}

function drawCustomForceDirected(algoResult, sparqlResults, colResults) {
    var links = [];
    var colorMapping = ["licensing", "suit", "resolved"];
    var mapperObj = {};
    sparqlResults.forEach((obj, i) => {
        for (var x in obj) {
            obj[x.toLowerCase()] = obj[x];
        }
        var pushObj = {
            source: obj[algoResult.y.toLowerCase()],
            target: obj[algoResult.x.toLowerCase()],
            type: colorMapping[i % 3]
        };
        var date = new Date(obj[algoResult.label.toLowerCase()]);
        var year = date.getFullYear();
        mapperObj["" + year] = mapperObj["" + year] || [];
        mapperObj["" + year].push(pushObj);
    });
    $(".chart_areas").html("");
    var count = 0;
    for (var key in mapperObj) {
        count++;
        drawForceLayoutGraph(mapperObj[key], count, key);
    }
}

function drawCustomBubbleChart(algoResult, sparqlResults, colResults) {
    var accdata = { children: [] };
    sparqlResults.forEach((obj, i) => {
        for (var x in obj) {
            obj[x.toLowerCase()] = obj[x];
        }
        accdata.children.push({ Name: obj[algoResult.x.toLowerCase()], Count: obj[algoResult.y.toLowerCase()] });
    });
    drawBubbleChart(accdata);
}

function drawCustomAreaChart(algoResult, sparqlResults, colResults) {
    var areaData = [];
    sparqlResults.forEach((obj, i) => {
        for (var x in obj) {
            obj[x.toLowerCase()] = obj[x];
        }
        var event = obj[algoResult.x.toLowerCase()];
        event = nameMapping[event] || event;
        var numberofevents = obj[algoResult.y.toLowerCase()];
        areaData.push({
            "date": i,
            "close": numberofevents,
            "actual": event,
            "age": event,
            "population": numberofevents
        });
    });
    drawAreaChart(areaData,algoResult.x,algoResult.y);
    var gElements = $("#chart_area").find(".area_x").find("g");
    var len = gElements.length - 1;
    for (var loop = areaData.length - 1; loop >= 0; loop-- , len--) {
        $(gElements[len]).find("text").text(areaData[loop].actual);
    }
}

function drawCustomCharts(algoResult, sparqlResults, colResults) {
    console.log("algoResult:", algoResult);
    if (algoResult.type == "tree") {
        drawCustomTreeChart(algoResult, sparqlResults, colResults)
    } else if (algoResult.type == "lollipop") {
        drawCustomLollipopChart(algoResult, sparqlResults, colResults)
    } else if (algoResult.type == "bar") {
        drawCustomBarChart(algoResult, sparqlResults, colResults)
    } else if (algoResult.type == "column") {
        drawCustomColumnChart(algoResult, sparqlResults, colResults)
    } else if (algoResult.type == "geomap") {
        drawCustomCountryChart(algoResult, sparqlResults, colResults)
    } else if (algoResult.type == "multiline") {
        drawCustomMultilineChart(algoResult, sparqlResults, colResults)
    } else if (algoResult.type == "heatmap") {
        drawCustomHeatMapChart(algoResult, sparqlResults, colResults)
    } else if (algoResult.type == "forcedirected") {
        drawCustomForceDirected(algoResult, sparqlResults, colResults)
    } else if (algoResult.type == "bubble") {
        drawCustomBubbleChart(algoResult, sparqlResults, colResults)
    } else if (algoResult.type == "area") {
        drawCustomAreaChart(algoResult, sparqlResults, colResults)
    }
}