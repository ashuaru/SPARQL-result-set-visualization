function drawForceLayoutGraph(links, index, year) {
    var nodes = {};

    // Compute the distinct nodes from the links.
    links.forEach(function (link) {
        link.source = nodes[link.source] || (nodes[link.source] = { name: link.source });
        link.target = nodes[link.target] || (nodes[link.target] = { name: link.target });
    });

    var width = 960,
        height = 500;

    var force = d4.layout.force()
        .nodes(d4.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(60)
        .charge(-300)
        .on("tick", tick)
        .start();

    $("#chart_area_" + index).html(`<div style='font-weight:bold'>Year ${year}</div>`)
    var svg = d4.select("#chart_area_" + index).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "force_directed");

    var tip = d4.tip().attr('class', 'd4-tip')
        .html(function (d) {
            var x = links.filter(g => g.source.name == d.name).map(t => t.target.name).toString();
            var y = links.filter(g => g.target.name == d.name).map(t => t.target.name).toString();
            return "<span>" + "inbound: " + x + "</span><br><span>" + "outbound: " + y + "</span>";
        });

    var colors = { licensing: "blue", suit: "red", resolved: "green" };
    // Per-type markers, as they don't inherit styles.
    svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
        .enter().append("marker")
        .attr("id", function (d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");

    svg.call(tip);
    var path = svg.append("g").selectAll("path")
        .data(force.links())
        .enter().append("path")
        .attr("class", function (d) { return "link " + d.type; })
        .attr("marker-end", function (d) { return "url(#" + d.type + ")"; });

    var ct = svg.append("g").selectAll(".node")
        .data(force.nodes())
        .enter().append("g").attr("class", "node");

    var circle = ct.append("circle")
        .attr("r", 8)
        .style("fill", function (d) { return "yellow"; });

    var clabel = ct.append("text")
        .attr("dy", function (d) { return 10; })
        .text(function (d) { return d.name; });

    ct.call(force.drag);
    ct.on("mouseover", tip.show).on("mouseout", tip.hide).on("dblclick", pin);
    // Use elliptical arc path segments to doubly-encode directionality.
    function tick() {
        path.attr("d", linkArc);
        ct.attr("transform", transform);
    }

    function linkArc(d) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    }
    function transform(d) {
        return "translate(" + d.x + "," + d.y + ")";
    }
    function pin(d) {
        d4.select(this).classed("fixed", d.fixed = !d.fixed);
    }
}