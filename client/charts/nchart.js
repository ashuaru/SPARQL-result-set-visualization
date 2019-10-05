function generateNQuery() {
    var lastQueryParams = {};
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", "n");

    var nQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
        PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
        PREFIX seo: <http://purl.org/seo/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX eventskg: <http://purl.org/events_ds#>
        PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
        SELECT ?publisher (COUNT(?publisher) AS ?published)
        WHERE
        {
        ?e seo:hasPublisher ?publisher.
        }
        GROUP BY ?publisher
        ORDER BY DESC(?published)

        `;
    reInitControls(nQuery, "nChart");
}

function constructNChart(results) {
    var chartSubType = $("#chart_type").val();
    if (chartSubType == "bar") {
        constructNColumnChart(results);
    } else if (chartSubType == "radial_bar_chart") {
        constructNRadialBarChart(results);
    } else if (chartSubType == "lollipop_single") {
        drawNlolipop(results);
    } else if (chartSubType == "column") {
        constructNBarChart(results)
    } else if (chartSubType == "radialbar") {
        constructNradialbarchart(results)
    }
    else {
        constructNLineChart(results)
    }

}

function constructNColumnChart(results) {
    var publishdata = [];
    results.forEach(data => {
        console.log(data);
        var publisher = data.binding[0].literal[0];
        var published = Number(data.binding[1].literal["#text"]);
        publishdata.push({ salesperson: publisher, sales: published })
    });
    drawBarChart(publishdata, "Publisher");
}

function constructNBarChart(results) {
    var bardata = [];
    results.forEach(data => {
        console.log(data);
        var publisher = data.binding[0].literal[0];
        var published = Number(data.binding[1].literal["#text"]);
        bardata.push({
            "over": publisher,
            "2614": published,
            "4449": 0
        });

    });
    $("#chart_area").empty();
    var columnsInfo = { "2614": "published", "4449": "" };
    var barChartConfig = {
        mainDiv: "#chart_area",
        colorRange: ["#008000", "#0000A0"],
        data: bardata,
        columnsInfo: columnsInfo,
        xAxis: "runs",
        yAxis: "over",
        label: {
            xAxis: "published",
            yAxis: "publisher"
        }
    };
    new horizontalGroupBarChart(barChartConfig);
}

function drawNlolipop(results) {
    var loliData = [];
    var maxVal = -Infinity, minVal = Infinity;
    results.forEach((obj, i) => {
        var publisher = obj.binding[0].literal[0];
        var val = Number(obj.binding[1].literal["#text"]);
        if (val > maxVal) {
            maxVal = val;
        }

        loliData.push({
            Country: publisher,
            Value: val
        })
    });
    drawSingleLoliPop(loliData, maxVal, "Published", "Publisher");
}

function constructNRadialBarChart(results) {
    var flatArray = [];
    var min = Infinity, max = -Infinity;
    results.forEach(obj => {
        var publisher = obj.binding[0].literal[0];
        var value = Number(obj.binding[1].literal["#text"]);
        if (min > value) {
            min = value;
        }
        if (max < value) {
            max = value;
        }
        flatArray.push({
            "Country": publisher,
            "Value": value
        })
    });
    drawRadialBar(flatArray, min, max);
}

/* function constructNLineChart(results) {
    var publishedData = [
        {
            name: "value",
            values: []
        }
    ];
    var dateArr = [];
    results.forEach((data, index) => {
        var publisher = data.binding[0].literal[0];
        var value = Number(data.binding[1].literal["#text"]); 
         publishedData[0].values.push({ date: publisher, price: value });
    });
    constructLineGraph(publishedData, "chart_area", "publisher");
    var gElements = $("#chart_area").find("g").find("g[class='x axis']").find("g");
    var len = gElements.length - 1;
    for (var loop = dateArr.length - 1; loop >= 0; loop-- , len--) {
        $(gElements[len]).find("text").text(dateArr[loop]);
        //$(gElements[len]).find("text").attr("transform", "rotate(-45)");
    }
}*/
function constructNradialbarchart(results) {
    var flatArray = [];
    var min = Infinity, max = -Infinity;
    results.forEach(obj => {
        var publisher = obj.binding[0].literal[0];
        var value = Number(obj.binding[1].literal["#text"]);
        if (min > value) {
            min = value;
        }
        if (max < value) {
            max = value;
        }
        flatArray.push({
            "name": publisher,
            "value": value
        })
    });
    drawRadialChart(flatArray, min, max);
}






