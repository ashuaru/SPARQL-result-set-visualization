function generateKQuery() {

    var series = $("#k_series").val();

    var lastQueryParams = { "k_series": series };
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", "k");

    var kQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg: <http://w3id.org/EVENTSKG-Dataset/ekg#>
    SELECT ?events ?startDate ?endDate
    WHERE{
        ?events seo:belongsToSeries ?series.
        FILTER(?series = eventskg:${series}).
        ?events conference-ontology:startDate ?startDate.
        ?events conference-ontology:endDate ?endDate.
    }`
    reInitControls(kQuery, "kChart");

}
function constructKChart(results) {
    var chartSubType = $("#chart_type").val();
    if (chartSubType == "condegram") {
        constructKcondegramChart(results)
    } else if (chartSubType == "heatmap1") {
        constructKheatMapChart(results);
    } else if (chartSubType == "heatmap2") {
        constructKheatMapChart2(results);
    }
}


function constructKheatMapChart(results) {
    var inputData = [];
    var seriesList = {};
    results.forEach((obj, i) => {
        var event = obj.binding[0].uri.split("#")[1];
        var sDate = new Date(obj.binding[1].literal['#text']);
        var month = sDate.getMonth();
        if (!seriesList[event]) {
            seriesList[event] = [];
            for (var i = 1; i < 13; i++) {
                seriesList[event].push({ month: i, type: event, value: 0 });
            }
        }
        seriesList[event][month].value += 1;
    });
    var radial_labels = [];
    for (var key in seriesList) {
        radial_labels.push(key);
        inputData = inputData.concat(seriesList[key]);
    }
    var segment_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    loadCircularHeatMap(inputData, "#chart_area", radial_labels, segment_labels);
}

function constructKheatMapChart2(results) {
    var inputData = [];
    var seriesList = {};
    results.forEach((obj, i) => {
        var event = obj.binding[0].uri.split("#")[1];
        var sDate = new Date(obj.binding[1].literal['#text']);
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

function constructKcondegramChart(results) {
    console.log("results::::", results);
    var someData = [];
    results.forEach((obj, i) => {
        var event = obj.binding[0].uri;
        var sDate = new Date(obj.binding[1].literal['#text']);
        var eDate = obj.binding[2].literal['#text'];
        var currentDate = new Date();
        currentDate.setDate(sDate.getDate() + i);
        someData.push({
            date: currentDate,
            value: 1,
            event: event,
            group: currentDate.getMonth()
        });

    });
    N = results.length;
    drawCondegram(someData, N);
}