function generateMQuery() {
    var lastQueryParams = {};
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", "m");

    var mQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
        PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
        PREFIX seo: <http://purl.org/seo/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX eventskg: <http://purl.org/events_ds#>
        SELECT ?e ?sponsors ?sd
        WHERE {
        ?e seo:belongsToSeries ?series.
        ?e seo:hasSponsor ?sponsors.
        FILTER(?sponsors = "Google" || ?sponsors = "Facebook" || ?sponsors = "Microsoft")
        ?e conference-ontology:startDate ?sd.
        FILTER(YEAR(?sd) = 2016 || YEAR(?sd) = 2017 || YEAR(?sd) = 2018)
        }
      `;
    reInitControls(mQuery, "mChart");
}

function constructMChart(results) {
    var chartSubType = $("#chart_type").val();
    if (chartSubType == "force_directed") {
        constructMForceLayoutGraph(results)
    }
}

function constructMForceLayoutGraph(results) {
    console.log("results::::", results);
    var links1 = [], links2 = [], links3 = [];
    var colorMapping = {
        Google: "licensing",
        Microsoft: "suit",
        Facebook: "resolved"
    }
    results.forEach(obj => {
        var event = obj.binding[0].uri.split("#")[1];
        var sponsor = obj.binding[1].literal;
        var date = new Date(obj.binding[2].literal["#text"]);
        var year = date.getFullYear();
        var pushObj = {
            source: sponsor,
            target: event,
            type: colorMapping[sponsor]
        };
        if (year == 2018) {
            links1.push(pushObj);
        } else if (year == 2017) {
            links2.push(pushObj);
        } else {
            links3.push(pushObj);
        }
    });
    $(".chart_areas").html("");
    if (links1.length) {
        drawForceLayoutGraph(links1, 1, 2018);
    }
    if (links2.length) {
        drawForceLayoutGraph(links2, 2, 2017);
    }
    if (links3.length) {
        drawForceLayoutGraph(links3, 3, 2016);
    }
}