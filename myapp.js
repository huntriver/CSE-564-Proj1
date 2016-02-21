/**
 * Created by XinheHuang on 2016/2/6.
 */
var app = angular.module('myApp', []);

app.controller('barchartCtrl', function ($scope, $templateCache) {
    //$scope.vars = ["Admit", "Gender","Dept","Freq"];
    $scope.vars = ["AirPassengers", "time"];
    $scope.config = {
        width: "100%",
        height: 800,
        padding: 0.5,
        margin: {top: 30, right: 40, bottom: 30, left: 30},
        legendSpacing: 5,
        legendRectSize: 20,
    }

})

app.directive("barChart", function ($timeout) {
    var link = function (scope, element, attrs) {
        var config = scope.config;
        var margin = config.margin;


        var w = (config.width == "100%" ? $('.cChart').width() : config.width) - margin.left - margin.right;
        var h = config.height - margin.top - margin.bottom;
        var color = d3.scale.category20b();
        d3.csv(scope.data, function (data) {

            var updateChart = function () {
                var values = [];
                data.forEach(function (d) {
                    values.push(+d[scope.var]);
                });

                var dataset = d3.layout.histogram()
                    .bins(+scope.binsize)
                    (values);
                d3.select(".cChart svg").remove();
                d3.select(".tip").remove();
                var barChart = function () {
                    var maxheight = d3.max(dataset, function (d) {
                            return d.y
                        }) + 1;

                    var xdomain = dataset.map(function (d) {
                        return d.x;
                    });
                    xdomain.push(dataset[dataset.length - 1].x + dataset[0].dx);
                    //
                    var tip = d3.tip()
                        .attr('class', 'tip')
                        .offset([-5, 0])
                        .html(function (d) {
                            return d;
                        });


                    var x = d3.scale.ordinal()
                        .domain(xdomain)
                        .rangeBands([0, w]);

                    var y = d3.scale.linear()
                        .range([h, 0])
                        .domain([0, maxheight]);

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom")
                        .tickFormat(d3.format(".1f"));
                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left").ticks(maxheight);


                    var l = x(dataset[1].x) - x(dataset[0].x); //width between two ticks

                    var svg = d3.select(".cChart")
                        .append("svg")
                        .attr("id", 'barchart')
                        .attr("width", w + margin.left + margin.right)
                        .attr("height", h + margin.top + margin.bottom)
                        .append("g")
                        .attr("width", w)
                        .attr("height", h)
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        ;

                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + h + ")")
                        .call(xAxis)

                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end");

                    svg.call(tip);
                    var firstX = d3.transform(svg.select(".axis .tick").attr("transform")).translate[0];
                    svg.selectAll("rect")
                        .data(dataset)
                        .enter()
                        .append("rect")
                        .attr("x", function (d, i) {
                            return firstX + x(d.x) + (1 - config.padding) / 2 * l;
                        })
                        .attr("y", function (d) {
                            return h - (d.y * h / maxheight);
                        })
                        .attr("width", l * config.padding)
                        .attr("height", function (d) {
                            return d.y * h / maxheight;
                        })
                        .attr("fill", function (d, i) {
                            return color(i)
                        })
                        .on('mouseover', function (d, i) {

                            d3.select(this).transition()
                                .attr("x", firstX + x(d.x) + (1 - config.padding) / 2 * l - l * config.padding * 0.05)
                                .attr("width", l * config.padding + l * config.padding * 0.1)
                                .attr("y", h - (d.y * h / maxheight) - d3.select(this).attr("height") * 0.05)
                                .attr("height", (d.y * h / maxheight) + d3.select(this).attr("height") * 0.05)
                                .style("opacity", 1);

                            var tmp = d3.select(this).attr("height") * 0.05;
                            tip.show(d.y);

                            d3.select(".tip")
                                .transition()
                                .style("top", function () {
                                    var x = d3.select(this).style("top");
                                    var a = parseFloat(x.substring(0, x.indexOf("px"))) - tmp;
                                    return a + "px";
                                });

                        })
                        .on('mouseout', function (d, i) {
                            d3.select(this).transition()
                                .attr("x", firstX + x(d.x) + (1 - config.padding) / 2 * l)
                                .attr("width", l * config.padding)
                                .attr("y", h - (d.y * h / maxheight))
                                .attr("height", d.y * h / maxheight)
                                .style("opacity", 0.6);
                            var tmp = d3.select(this).attr("height") * 0.05;
                            d3.select(".tip")
                                .style("top", function () {
                                    var x = d3.select(this).style("top");
                                    var a = parseFloat(x.substring(0, x.indexOf("px"))) + tmp;
                                    return a + "px";
                                });
                            tip.hide(d.y);
                        });
                }
                var pieChart = function () {
                    var radius = (w > h ? h : w) / 2 - 20;
                    var piedata = dataset.map(function (d) {
                        return {"y": d.y, "x": d.x, "dx": d.dx,};
                    })
                    var pie = d3.layout.pie()
                        .sort(null).value(function (d) {
                            return d.y
                        });

                    var arc = d3.svg.arc()
                        .innerRadius(0)
                        .outerRadius(radius);

                    var harc = d3.svg.arc()
                        .innerRadius(0)
                        .outerRadius(radius + 10);
                    var labelArc = d3.svg.arc()
                        .outerRadius(radius - 60)
                        .innerRadius(radius - 60);
                    var tip = d3.tip()
                        .attr('class', 'tip')
                        .direction('n')
                        .html(function (d) {
                            return "<strong>" + d3.format(".1f")(d.data.x) + "~" + d3.format(".1f")(d.data.x + d.data.dx) + ": </strong><span>" + d.data.y + "</span><br>";
                        });


                    var svg = d3.select(".cChart")
                        .append("svg")
                        .attr("id", 'piechart')
                        .attr("width", w)
                        .attr("height", h)
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .append('g')
                        .attr('transform', 'translate(' + (w / 2) + ',' + (h / 2) + ')');

                    svg.call(tip);

                    var g = svg.selectAll("path.pie")
                        .data(pie(piedata))
                        .enter().append("g")
                        .attr("class", 'pie');
                    var lengendarr = [];
                    g.append("path")
                        .attr("fill", function (d, i) {
                            lengendarr.push({
                                "color": i,
                                "text": d3.format(".1f")(d.data.x) + "~" + d3.format(".1f")(d.data.x + d.data.dx)
                            });
                            return color(i);
                        })
                        .attr("d", arc)
                        .on('mouseover', function (d, i) {
                            d3.select(this).transition().attr("d", harc).style("opacity", 1);
                            var leg = d3.selectAll(".legend").filter(function (d1) {
                                return d1.color == i;
                            })
                            leg.select("rect").transition().style("opacity", 1);
                            leg.select("text").transition().style("font-size", 15).style("font-weight", "bold");
                            tip.show(d);
                        }).on('mouseout', function (d, i) {
                        d3.select(this).transition().attr("d", arc).style("opacity", 0.6);
                        var leg = d3.selectAll(".legend").filter(function (d1) {

                            return d1.color == i;
                        })
                        leg.select("rect").transition().style("opacity", 0.6);
                        leg.select("text").transition().style("font-size", 12).style("font-weight", "bold");
                        tip.hide(d);
                    });


                    var legendRectSize = config.legendRectSize;
                    var legendSpacing = config.legendSpacing;
                    var legend = svg
                        .selectAll('.legend')

                        .data(lengendarr)
                        .enter()
                        .append('g')
                        .attr('class', 'legend');

                    legend.append('rect')
                        .attr('width', legendRectSize)
                        .attr('height', legendRectSize)
                        .style('fill', function (d) {
                            ;
                            return color(d.color)
                        })
                        .style('stroke', function (d) {
                            return color(d.color)
                        })
                        .style('');
                    legend.append('text')
                        .attr('x', legendRectSize + legendSpacing)
                        .attr('y', legendRectSize - legendSpacing)
                        .text(function (d) {
                            return d.text;
                        });

                    var maxtext = d3.max($('.legend text').map(function () {

                        return ($(this).width());
                    }));
                    svg
                        .selectAll('.legend')
                        .attr('transform', function (d, i) {
                            var height = legendRectSize + legendSpacing;
                            var offset = height * color.domain().length;
                            var horz = -2 * legendRectSize + w / 2 - maxtext;
                            var vert = i * height - h / 2;
                            return 'translate(' + horz + ',' + vert + ')';
                        });

                }
                var forceChart = function () {
                    var nodesdata = [], linksdata = [];
                    var data = [];
                    var j = 0;
                    dataset.forEach(function (d, i) {
                        data.push(d.map(function (d1, i1) {
                            var a = {"value": d1, "id": j};
                            nodesdata.push({"value": d1, "group": i, "id": j});
                            j++;
                            return a;

                        }));
                    });
                    data.forEach(function (d, i) {
                        var k, j;
                        for (j = 0; j < d.length; j++)
                            for (k = j + 1; k < d.length; k++) {
                                linksdata.push({
                                    "source": d[j].id,
                                    "target": d[k].id,
                                    "distance": Math.abs(parseFloat(d[j].value - d[k].value))
                                });

                            }

                        for (j = i + 1; j < data.length; j++) {
                            linksdata.push({
                                "source": data[i][0].id,
                                "target": data[j][0].id,
                                "distance": Math.abs(parseFloat(dataset[i].x - dataset[j].x))
                            });

                        }
                    });
                    var force = d3.layout.force()
                        .charge(-30)
                        .linkDistance(function (link) {
                            return link.distance + 30;
                        })
                        .size([w, h]);
                    var tip = d3.tip()
                        .attr('class', 'tip')
                        .offset([-5, 0])
                        .html(function (d) {
                            return d;
                        });

                    var svg = d3.select(".cChart").append("svg")
                        .attr("id", "forcechart")
                        .attr("width", w)
                        .attr("height", h)
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    svg.call(tip);
                    force
                        .nodes(nodesdata)
                        .links(linksdata)
                        .start();

                    var link = svg.selectAll(".link")
                        .data(linksdata)
                        .enter().append("line")
                        .attr("class", "link")
                        .style("stroke-width", function (d) {
                            return 1;
                        });

                    var node = svg.selectAll(".node")
                        .data(nodesdata)
                        .enter().append("circle")
                        .attr("class", "node")
                        .attr("r", 5)

                        .on('mouseover', function (d, i) {


                            tip.show(d.value);
                        }).on('mouseout', function (d, i) {


                            tip.hide(d.value);
                        })
                        .style("fill", function (d) {
                            return color(d.group);
                        })
                        .call(force.drag);

                    node.append("title")
                        .text(function (d) {
                            return d.value;
                        });

                    force.on("tick", function () {
                        link.attr("x1", function (d) {
                                return d.source.x;
                            })
                            .attr("y1", function (d) {
                                return d.source.y;
                            })
                            .attr("x2", function (d) {
                                return d.target.x;
                            })
                            .attr("y2", function (d) {
                                return d.target.y;
                            });

                        node.attr("cx", function (d) {
                                return d.x;
                            })
                            .attr("cy", function (d) {
                                return d.y;
                            });

                    });

                };


                switch (scope.type) {
                    case 'barchart':
                        barChart();
                        break;
                    case 'piechart':
                        pieChart();
                        break;
                    case 'forcechart':
                        forceChart();
                        break;
                }


            }
            updateChart();
            scope.$watchGroup(['var', 'binsize', 'type'], function () {

                console.log('update');
                updateChart();
            })


        })
    }

    var controller = function ($scope) {

    }
    return {
        restrict: 'AE',
        scope: {
            "binsize": "=",
            "data": "@",
            "var": "=",
            "config": "=",
            "type": "="
        },
        link: link,
        controller: controller,
        template: ""
    };
})
