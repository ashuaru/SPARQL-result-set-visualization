function drawHourHeatMap(drawingData, days, times) {
    var margin = { top: 50, right: 0, bottom: 100, left: 30 },
        width = 960 - margin.left - margin.right,
        height = 1380 - margin.top - margin.bottom,
        gridSize = Math.floor(width / 24),
        legendElementWidth = gridSize * 2,
        buckets = 2,
        colors = ["#ffffd9",  "#081d58"]; 

    var svg = d4.select("#chart_area").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "heatmap2")
        .append("g")
        .attr("transform", "translate(" + (margin.left+200) + "," + margin.top + ")");

    var dayLabels = svg.selectAll(".dayLabel")
        .data(days)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function (d, i) { return "dayLabel mono axis axis-workweek";});

    var timeLabels = svg.selectAll(".timeLabel")
        .data(times)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", function (d, i) { return i * gridSize; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)")
        .attr("class", function (d, i) { return "timeLabel mono axis axis-worktime" });


    var data = drawingData.map((d,i) => {
        return { day: +d.day, hour: +d.hour, value: +d.value, index: d.index};
    });
    var colorScale = d4.scale.quantile()
        .domain([0, buckets - 1, d4.max(data, function (d) { return d.value; })])
        .range(colors);

    var cards = svg.selectAll(".hour")
        .data(data, function (d) { return d.day + ':' + d.hour; });

    cards.append("title");

    cards.enter().append("rect")
        .attr("x", function (d) { return (d.hour - 1) * gridSize; })
        .attr("y", function (d) { return (d.index) * gridSize; })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "hour bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", colors[0]);

    cards.transition().duration(1000)
        .style("fill", function (d) { return colorScale(d.value); });

    cards.select("title").text(function (d) { return d.value; });

    cards.exit().remove();

    var legend = svg.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function (d) { return d; });

    legend.enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
        .attr("x", function (d, i) { return legendElementWidth * i; })
        .attr("y", height)
        .attr("width", legendElementWidth)
        .attr("height", gridSize / 2)
        .style("fill", function (d, i) { return colors[i]; });

    legend.append("text")
        .attr("class", "mono")
        .text(function (d) { return "≥ " + Math.round(d); })
        .attr("x", function (d, i) { return legendElementWidth * i; })
        .attr("y", height + gridSize);

    legend.exit().remove();

}