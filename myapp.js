/**
 * Created by XinheHuang on 2016/2/6.
 */

var w = 400;
var h = 100;
var barPadding = 10;

var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

//Create SVG element
var svg = d3.select("div")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        return d;
    });
svg.call(tip);
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return i * (w / dataset.length);
    })
    .attr("y", function (d) {
        return h - (d * 4);
    })
    .attr("width", w / dataset.length - barPadding)
    .attr("height", function (d) {
        return d * 4;
    })
    .on('mouseover', function (d,i) {
        $(this).attr("x",
            i * (w / dataset.length)-2.5);
        $(this).attr("width", w / dataset.length - barPadding + 5);
        $(this).attr("y", h - d * 4 - 10);
        $(this).attr("height", d * 4 + 10);
        $(this).css("opacity",1);
        tip.show(d)
    })
    .on('mouseout', function (d,i) {
        $(this).attr("x",
            i * (w / dataset.length));
        $(this).attr("width", w / dataset.length - barPadding);
        $(this).attr("y", h - d * 4);
        $(this).attr("height", d * 4);
        $(this).css("opacity",0.6);
        tip.hide(d);
    });



