function generateLQuery() {

  var year = $("#l_year").val();

  var lastQueryParams = { "l_year": year };
  localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
  localStorage.setItem("last_query_type", "l");

  var lQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
    PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg: <http://purl.org/events_ds#>
    SELECT ?e ?country (COUNT(?country) as ?count) 
    WHERE {
      ?e seo:belongsToSeries ?series.
      ?e seo:heldInCountry  ?country.
      ?e conference-ontology:startDate ?sd
      FILTER(YEAR(?sd)= ${year})
    }
    GROUP BY ?e ?country ?sd
    `;
  reInitControls(lQuery, "lChart");
}

function constructLChart(results) {
  var chartSubType = $("#chart_type").val();
  if (chartSubType == "geomap") {
    constructlGeoMap1(results)
  } else if (chartSubType == "geomap2") {

  } else if (chartSubType == "geomap3") {

  }
}

function constructlGeoMap1(results) {
  var flatArray = [];
  var countryList = returnCountryIds();
  results.forEach(data => {
    console.log(data);

    var events = data.binding[0].uri.split("#");
    var country = data.binding[1].uri.split("/");
    console.log(country);
    country = country[country.length - 1].replace("_", " ");
    console.log(country);
    var count = Number(data.binding[2].literal["#text"]);
    flatArray.push({ country: country, events: events, count: count });
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

/*function constructGeoMap1(results) {
  console.log("results::::", results);
  
  drawGeoMap1(results);
}*/