function generateOQuery() {
    var lastQueryParams = {};
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", "o");

    var oQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
                  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
                  PREFIX seo: <http://purl.org/seo/>
                  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                  PREFIX eventskg: <http://purl.org/events_ds#>
                  SELECT DISTINCT ?series (AVG(?accrate) AS ?result) 
                  WHERE{
                  ?e seo:belongsToSeries ?series.
                  ?e seo:acceptanceRate ?accrate.
                  }
                  `;
    reInitControls(oQuery, "oChart");
}

function constructOChart(results) {
    var chartSubType = $("#chart_type").val();
    if (chartSubType == "bubble") {
        constructOBubbleChart(results);
    }
}

function constructOBubbleChart(results) {
    var accdata = { children: [] };
    results.forEach(data => {
        console.log(data);
        var uri = data.binding[0].uri.split("#")[1];
        var accrate = Number(data.binding[1].literal["#text"]);
        accdata.children.push({ Name: uri, Count: accrate });
    });
    drawBubbleChart(accdata);

}
