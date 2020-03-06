$(document).ready(function () {
    populateOptions();
    var lastQueryType = localStorage.getItem("last_query_type");
    if (lastQueryType) {
        $("#chartType").val(lastQueryType);
        showHideOptionsDiv(lastQueryType);
        var lastQueryParams = JSON.parse(localStorage.getItem("last_query_params"));
        if (lastQueryType == "custom") {
            var lastQuery = localStorage.getItem("last_query");
            //$("#x_param").val(lastQueryParams.xParam);
            //$("#y_param").val(lastQueryParams.yParam);
            $("#query").val(lastQuery);
        } else {
            for (var key in lastQueryParams) {
                $("#" + key).val(lastQueryParams[key]);
            }
            var funcName = window[`generate${lastQueryType.toUpperCase()}Query`];
            funcName && funcName()
        }
    }
});
function showHideHomeSearch(page) {
    localStorage.setItem("last_visited_tab", page);
    $("#home_page,#search_page").hide();
    $("#" + page + "_page").show();
    $(".links").css('font-weight', 'normal');
    $("#" + page + "_link").css('font-weight', 'bolder')
}
function populateOptions() {
    var fieldStr = getFieldStr();
    $("#a_fields,#b_fields").html(fieldStr);
    var countriesStr = getCountriesStr();
    $("#a_country,#e_country").html(countriesStr);
    var seriesStr = getSeriesStr();
    $("#c_series,#f_series,#h_series,#k_series").html(seriesStr);
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthStr = "";
    month.forEach((obj, i) => {
        monthStr += `<option value=${i + 1}>${obj}</option>`
    });
    $("#g_month").html(monthStr);
}
function showHideOptionsDiv(opt) {
    $(`.options`).hide();
    if (opt == "custom") {
        $("#query_desc").html("Enter SPARQL query")
        $("#query_div").show();
        $("#axis_params,.type_params").hide();
        $("#x_param,#y_param").val("");
        chartType = "customChart";
        $("#query").val(prefixQuery);
    } else {
        $("#query_desc").html("Corresponding SPARQL query");
        $(`#${opt}_options`).show();
        $("#query_div,#query_button_div").hide();
        $("#axis_params").hide();
        $(".type_params").show();
        $("#query").val("");
        $("#chart_main_type").val("manual")
    }
    $("#chart_area,#Legend_chart_area,#legends,.chart_areas").html("");
    $("#chart_type").html(chartTypesAvailable[opt]);
}
function showHideQueryBox(val) {
    /*    if (val == "Hide Query") {
            $("#query_show").val("Show Query");
            $("#query_div").slideUp();
        } else {
            $("#query_show").val("Hide Query");
            $("#query_div").slideDown();
        }
    }*/
}
var chartsMapper = {
    aChart: constructAChart,
    bChart: constructBChart,
    cChart: constructCChart,
    dChart: constructDChart,
    eChart: constructEChart,
    fChart: constructCChart,
    gChart: constructGChart,
    hChart: constructHChart,
    iChart: constructIChart,
    jChart: constructJChart,
    kChart: constructKChart,
    lChart: constructLChart,
    mChart: constructMChart,
    nChart: constructNChart,
    oChart: constructOChart
}
var chartTypesAvailable = {
    a: `<option value="tree">Tree chart</option><option value="bubble">Bubble chart</option>`,
    //a: `<option value="tree">Tree chart</option><option value="packing">Circle Packing chart</option><option value="bubble">Bubble chart</option>`,
    //b: `<option value="bubble">Bubble chart</option><option value="tree">Tree chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    b: `<option value="bubble">Bubble chart</option><option value="tree">Tree chart</option>`,
    c: `<option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option><option value="lollipop">Lollipop chart</option>`,
    d: `<option value="bubble">Bubble chart</option><option value="lollipop">Lollipop Chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    e: `<option value="donut">Donut chart</option><option value="radialbar">Radial chart</option><option value="lollipop_single">Lollipop Chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    f: `<option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option><option value="lollipop">Lollipop chart</option>`,
    //g: `<option value="radial_bar">Radial bar chart</option><option value="donut">Donut chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    g: `<option value="radial_bar_chart">Radial bar chart</option><option value="lollipop_single">Lollipop Chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    h: `<option value="geomap">Geomap</option><option value="donut">Donut chart</option>`,
    i: `<option value="platelets">Platelets chart</option><option value="radialbar">Radial chart</option><option value="lollipop_single">Lollipop Chart</option><option value="area">Area chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    j: `<option value="rect_area">Rectangular chart</option><option value="lollipop_single">Lollipop Chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    k: `<option value="condegram">Condegram Spiral Chart</option><option value="heatmap1">Heat map 1</option><option value="heatmap2">Heat map 2</option>`,
    l: `<option value="geomap">Geo Map</option><!--option value="geomap2">Geo Map 2</option><option value="geomap3">Geo Map 3</option-->`,
    m: `<option value="force_directed">Force directed</option>`,
    n: `<option value="bar">Bar chart</option><option value="radialbar">Radial chart</option><option value= "column">Column chart</option><option value="lollipop_single">Lollipop Chart</option><option value="radial_bar_chart">Radial bar chart</option>`,
    o: `<option value="bubble">Bubble chart</option>`,
    custom: ``
}
var nameMapping = {
    InformationSystems: "IS",
    ComputerSystemsOrganization: "CSO",
    SoftwareEngineering: "SE",
    WorldWideWeb: "WWW",
    ArtificialIntelligence: "AI",
    HumanCenteredComputing: "HCC",
    TheoryOfComputations: "TOC",
    SecurityAndPrivacy: "SEC"
};
function sendRequest(isDownload) {
    var query = $("#query").val();
    if (!query) {
        alert("Query can't be empty");
        return;
    }
    /*if (chartType == "kChart" && ($("#x_param").val().trim() == "" || $("#y_param").val().trim() == "")) {
        alert("X & Y fields can't be empty");
        return;
    }*/
    $("#loading_gif").show();
    $("#chart_area,#Legend_chart_area,#legends").html("");
    //$("#query_show").val("Show Query");
    //$("#query_div").slideUp();

    if (chartType == "customChart" || $("#chart_main_type").val() == "automatic") {
        executeCustomQuery(query, isDownload)
    } else {
        executeStandardQuery(query, isDownload)
    }
}
function downloadResults(result) {
    var filename = "results.json";
    var blob = new Blob([JSON.stringify(result)], { type: "text/json" });
    var link = document.createElement('a');
    //console.log(link);
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        document.body.appendChild(link);
        setTimeout(function () {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        }, 1000);
        link.click();
    }
}
function executeStandardQuery(query, isDownload) {
    var url = `/queryResult?query=${encodeURIComponent(query)}&noParse=true`;
    $.ajax({
        url: url,
        success: function (results) {
            $("#loading_gif").hide();
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(results, "text/xml");
            var response = xml2json(xmlDoc).replace("undefined", "");
            response = JSON.parse(response);
            var results = response.sparql.results.result;
            if (!results) {
                alert("No results found");
                return;
            }
            if (isDownload) {
                return downloadResults(results);
            }
            if (!(results instanceof Array)) {
                results = [results]
            }
            chartsMapper[chartType] && (chartsMapper[chartType])(results);
        },
        error: function (error) {
            $("#loading_gif").hide();
            alert("Error in getting SPARQL results");
        }
    });
}
function executeCustomQuery(query, isDownload) {
    var url = `/queryResult?query=${encodeURIComponent(query)}`;
    $.ajax({
        url: url,
        success: function (results) {
            $("#loading_gif").hide();
            console.log("executeCustomQuery results:", results);
            if (!results || results.length == 0) {
                alert("No results found");
                return;
            }
            if (isDownload) {
                return downloadResults(results);
            }
            extractCols(query, results);
        },
        error: function (error) {
            $("#loading_gif").hide();
            alert("Error in getting SPARQL results");
        }
    });
}
function extractCols(query, queryResults) {
    var url = `/parseQuery?query=${encodeURIComponent(query)}`;
    $.ajax({
        url: url,
        success: function (results) {
            console.log("extractCols results:", results);
            var colsNames = [];
            if (results.error) {
                colsNames = results.cols;
            } else {
                (results.variables || []).forEach(obj => {
                    var col = obj.variable ? obj.variable.value : obj.value;
                    if (col) {
                        colsNames.push(col);
                    }
                });
            }
            console.log(colsNames);
            detectChartType(colsNames, queryResults, results);
        },
        error: function (error) {
            alert("Error in extracting columns");
        }
    });
}
function detectChartType(colsNames, queryResults, colResults) {
    var url = `/chartType?colNames=${encodeURIComponent(colsNames.join())}`;
    $.ajax({
        url: url,
        success: function (results) {
            drawCustomCharts(results, queryResults, colResults);
            console.log("detectChartType results:", results);
        },
        error: function (error) {
            alert("Error in Detecting chart type");
        }
    });
}
var chartType;
function reInitControls(queryVal, chartT) {
    $("#query").val(queryVal);
    $("#query_div,#query_button_div").show();
    $("#query_show").val("Hide Query");
    $("#chart_area,#Legend_chart_area,#legends,.chart_areas").html("");
    chartType = chartT;
}
function changeChartMainType() {
    if ($("#chart_main_type").val() == "automatic") {
        $("#chart_type").hide();
    } else {
        $("#chart_type").show();
    }
}
var prefixQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg: <http://w3id.org/EVENTSKG-Dataset/ekg#>
`