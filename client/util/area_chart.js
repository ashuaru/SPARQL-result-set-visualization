function drawAreaChart(data,xLabel,yLabel) {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the area
    var area = d3.area()
        .x(function (d) { return x(d.date); })
        .y0(height)
        .y1(function (d) { return y(d.close); });

    // define the line
    var valueline = d3.line()
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.close); });

    // format the data
    data.forEach(function (d) {
        //d.date = parseTime(d.date);
        d.close = +d.close;
    });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#chart_area").append("svg")
        .attr("class", "area_chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
    /*.data(data)
    .on("mouseover", function(d, i) {
        console.log(d, i)
        svg.append("text")
          .attr("class", "title-text")
          .style("fill", "black")        
          .text(d.close)
          .attr("text-anchor", "middle")
          .attr("x", (width-margin.left)/2)
          .attr("y", 5);
      })
    .on("mouseout", function(d) {
        svg.select(".title-text").remove();
      })*/




    // scale the range of the data
    x.domain(d3.extent(data, function (d) { return d.date; }));
    y.domain([0, d3.max(data, function (d) { return d.close; })]);

    // add the area
    svg.append("path")
        .data([data])
        .attr("class", "area")
        .attr("d", area)

    // add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("class", "area_x")
        .append('text')
        .attr("x", 900)
        .attr("y", 25)
        .attr("fill", "#000")
        .text(xLabel || "Field");

    // add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .append('text')
        .attr("y", 0)
        .attr("fill", "#000")
        .text(yLabel || "Count");
}