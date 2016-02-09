/**
 * Created by XinheHuang on 2016/2/6.
 */
var app = angular.module('myApp', []);
app.controller('barchartCtrl', function ($scope,$templateCache) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
app.directive("barChart", function () {
    var link = function (scope, element, attrs) {
        var w = 400;
        var h = 100;

        var svg = d3.select(".barchart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        var tip = d3.tip()
            .attr('class', 'tip')
            .offset([-5, 0])
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
            .attr("width", scope.size)
            .attr("height", function (d) {
                return d * 4;
            })
            .on('mouseover', function (d, i) {
                console.log(scope.size);
                $(this).attr("x",
                    i * (w / dataset.length) - scope.size/4);
                $(this).attr("width", parseFloat(scope.size) + scope.size/2);
                $(this).attr("y", h - d * 4 - 10);
                $(this).attr("height", d * 4 + 10);
                $(this).css("opacity", 1);

                tip.show(d)
            })
            .on('mouseout', function (d, i) {
                $(this).attr("x",
                    i * (w / dataset.length));
                $(this).attr("width", scope.size);
                $(this).attr("y", h - d * 4);
                $(this).attr("height", d * 4);
                $(this).css("opacity", 0.6);
                tip.hide(d);
            });

        scope.$watch('size',function(){
            //console.log(scope.size);
            svg.selectAll("rect").attr("width",scope.size);
        })
    }
    var controller = function ($scope) {

    }
    return {
        restrict: 'AE',
        scope: {
            "size": "="
        },
        link: link,
        controller: controller,
        templateUrl: 'templates/bar-chart.html'
    };
})

//
//var barChart = function () {
//    var w = 400;
//    var h = 100;
//    var barPadding = 10;
//
//
////Create SVG element
//    var svg = d3.select(".barchart")
//        .append("svg")
//        .attr("width", w)
//        .attr("height", h);
//
//    var tip = d3.tip()
//        .attr('class', 'tip')
//        .offset([-5, 0])
//        .html(function (d) {
//            return d;
//        });
//    svg.call(tip);
//    svg.selectAll("rect")
//        .data(dataset)
//        .enter()
//        .append("rect")
//        .attr("x", function (d, i) {
//            return i * (w / dataset.length);
//        })
//        .attr("y", function (d) {
//            return h - (d * 4);
//        })
//        .attr("width", w / dataset.length - barPadding)
//        .attr("height", function (d) {
//            return d * 4;
//        })
//        .on('mouseover', function (d, i) {
//            $(this).attr("x",
//                i * (w / dataset.length) - 2.5);
//            $(this).attr("width", w / dataset.length - barPadding + 5);
//            $(this).attr("y", h - d * 4 - 10);
//            $(this).attr("height", d * 4 + 10);
//            $(this).css("opacity", 1);
//
//            tip.show(d)
//        })
//        .on('mouseout', function (d, i) {
//            $(this).attr("x",
//                i * (w / dataset.length));
//            $(this).attr("width", w / dataset.length - barPadding);
//            $(this).attr("y", h - d * 4);
//            $(this).attr("height", d * 4);
//            $(this).css("opacity", 0.6);
//            tip.hide(d);
//        });
//};

var pieChart = function () {
    var w = 200;
    var h = 200;
    var r = h / 2;
    var color = d3.scale.category20();
    var svg = d3.select(".piechart")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .append('g')
        .attr('transform', 'translate(' + (w / 2) + ',' + (h / 2) + ')');


    var pie = d3.layout.pie().sort(null).value(function (d) {
        return d
    });

    var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(r);

    var path = svg.selectAll("path")
        .data(pie(dataset))
        .enter()
        .append("path")
        .attr("d", arc)
        .style("fill", function (d, i) {
            return color(i);
        });


};

var forceChart = function () {
    var width = 960,
        height = 500;
    var data = {
        "nodes": [
            {"name": "Myriel", "group": 1},
            {"name": "Napoleon", "group": 1},
            {"name": "Mlle.Baptistine", "group": 1},
            {"name": "Mme.Magloire", "group": 1},
            {"name": "CountessdeLo", "group": 1},
            {"name": "Geborand", "group": 1},
            {"name": "Champtercier", "group": 1},
            {"name": "Cravatte", "group": 1},
            {"name": "Count", "group": 1},
            {"name": "OldMan", "group": 1},
            {"name": "Labarre", "group": 2},
            {"name": "Valjean", "group": 2},
            {"name": "Marguerite", "group": 3},
            {"name": "Mme.deR", "group": 2},
            {"name": "Isabeau", "group": 2},
            {"name": "Gervais", "group": 2},
            {"name": "Tholomyes", "group": 3},
            {"name": "Listolier", "group": 3},
            {"name": "Fameuil", "group": 3},
            {"name": "Blacheville", "group": 3},
            {"name": "Favourite", "group": 3},
            {"name": "Dahlia", "group": 3},
            {"name": "Zephine", "group": 3},
            {"name": "Fantine", "group": 3},
            {"name": "Mme.Thenardier", "group": 4},
            {"name": "Thenardier", "group": 4},
            {"name": "Cosette", "group": 5},
            {"name": "Javert", "group": 4},
            {"name": "Fauchelevent", "group": 0},
            {"name": "Bamatabois", "group": 2},
            {"name": "Perpetue", "group": 3},
            {"name": "Simplice", "group": 2},
            {"name": "Scaufflaire", "group": 2},
            {"name": "Woman1", "group": 2},
            {"name": "Judge", "group": 2},
            {"name": "Champmathieu", "group": 2},
            {"name": "Brevet", "group": 2},
            {"name": "Chenildieu", "group": 2},
            {"name": "Cochepaille", "group": 2},
            {"name": "Pontmercy", "group": 4},
            {"name": "Boulatruelle", "group": 6},
            {"name": "Eponine", "group": 4},
            {"name": "Anzelma", "group": 4},
            {"name": "Woman2", "group": 5},
            {"name": "MotherInnocent", "group": 0},
            {"name": "Gribier", "group": 0},
            {"name": "Jondrette", "group": 7},
            {"name": "Mme.Burgon", "group": 7},
            {"name": "Gavroche", "group": 8},
            {"name": "Gillenormand", "group": 5},
            {"name": "Magnon", "group": 5},
            {"name": "Mlle.Gillenormand", "group": 5},
            {"name": "Mme.Pontmercy", "group": 5},
            {"name": "Mlle.Vaubois", "group": 5},
            {"name": "Lt.Gillenormand", "group": 5},
            {"name": "Marius", "group": 8},
            {"name": "BaronessT", "group": 5},
            {"name": "Mabeuf", "group": 8},
            {"name": "Enjolras", "group": 8},
            {"name": "Combeferre", "group": 8},
            {"name": "Prouvaire", "group": 8},
            {"name": "Feuilly", "group": 8},
            {"name": "Courfeyrac", "group": 8},
            {"name": "Bahorel", "group": 8},
            {"name": "Bossuet", "group": 8},
            {"name": "Joly", "group": 8},
            {"name": "Grantaire", "group": 8},
            {"name": "MotherPlutarch", "group": 9},
            {"name": "Gueulemer", "group": 4},
            {"name": "Babet", "group": 4},
            {"name": "Claquesous", "group": 4},
            {"name": "Montparnasse", "group": 4},
            {"name": "Toussaint", "group": 5},
            {"name": "Child1", "group": 10},
            {"name": "Child2", "group": 10},
            {"name": "Brujon", "group": 4},
            {"name": "Mme.Hucheloup", "group": 8}
        ],
        "links": [
            {"source": 1, "target": 0, "value": 1},
            {"source": 2, "target": 0, "value": 8},
            {"source": 3, "target": 0, "value": 10},
            {"source": 3, "target": 2, "value": 6},
            {"source": 4, "target": 0, "value": 1},
            {"source": 5, "target": 0, "value": 1},
            {"source": 6, "target": 0, "value": 1},
            {"source": 7, "target": 0, "value": 1},
            {"source": 8, "target": 0, "value": 2},
            {"source": 9, "target": 0, "value": 1},
            {"source": 11, "target": 10, "value": 1},
            {"source": 11, "target": 3, "value": 3},
            {"source": 11, "target": 2, "value": 3},
            {"source": 11, "target": 0, "value": 5},
            {"source": 12, "target": 11, "value": 1},
            {"source": 13, "target": 11, "value": 1},
            {"source": 14, "target": 11, "value": 1},
            {"source": 15, "target": 11, "value": 1},
            {"source": 17, "target": 16, "value": 4},
            {"source": 18, "target": 16, "value": 4},
            {"source": 18, "target": 17, "value": 4},
            {"source": 19, "target": 16, "value": 4},
            {"source": 19, "target": 17, "value": 4},
            {"source": 19, "target": 18, "value": 4},
            {"source": 20, "target": 16, "value": 3},
            {"source": 20, "target": 17, "value": 3},
            {"source": 20, "target": 18, "value": 3},
            {"source": 20, "target": 19, "value": 4},
            {"source": 21, "target": 16, "value": 3},
            {"source": 21, "target": 17, "value": 3},
            {"source": 21, "target": 18, "value": 3},
            {"source": 21, "target": 19, "value": 3},
            {"source": 21, "target": 20, "value": 5},
            {"source": 22, "target": 16, "value": 3},
            {"source": 22, "target": 17, "value": 3},
            {"source": 22, "target": 18, "value": 3},
            {"source": 22, "target": 19, "value": 3},
            {"source": 22, "target": 20, "value": 4},
            {"source": 22, "target": 21, "value": 4},
            {"source": 23, "target": 16, "value": 3},
            {"source": 23, "target": 17, "value": 3},
            {"source": 23, "target": 18, "value": 3},
            {"source": 23, "target": 19, "value": 3},
            {"source": 23, "target": 20, "value": 4},
            {"source": 23, "target": 21, "value": 4},
            {"source": 23, "target": 22, "value": 4},
            {"source": 23, "target": 12, "value": 2},
            {"source": 23, "target": 11, "value": 9},
            {"source": 24, "target": 23, "value": 2},
            {"source": 24, "target": 11, "value": 7},
            {"source": 25, "target": 24, "value": 13},
            {"source": 25, "target": 23, "value": 1},
            {"source": 25, "target": 11, "value": 12},
            {"source": 26, "target": 24, "value": 4},
            {"source": 26, "target": 11, "value": 31},
            {"source": 26, "target": 16, "value": 1},
            {"source": 26, "target": 25, "value": 1},
            {"source": 27, "target": 11, "value": 17},
            {"source": 27, "target": 23, "value": 5},
            {"source": 27, "target": 25, "value": 5},
            {"source": 27, "target": 24, "value": 1},
            {"source": 27, "target": 26, "value": 1},
            {"source": 28, "target": 11, "value": 8},
            {"source": 28, "target": 27, "value": 1},
            {"source": 29, "target": 23, "value": 1},
            {"source": 29, "target": 27, "value": 1},
            {"source": 29, "target": 11, "value": 2},
            {"source": 30, "target": 23, "value": 1},
            {"source": 31, "target": 30, "value": 2},
            {"source": 31, "target": 11, "value": 3},
            {"source": 31, "target": 23, "value": 2},
            {"source": 31, "target": 27, "value": 1},
            {"source": 32, "target": 11, "value": 1},
            {"source": 33, "target": 11, "value": 2},
            {"source": 33, "target": 27, "value": 1},
            {"source": 34, "target": 11, "value": 3},
            {"source": 34, "target": 29, "value": 2},
            {"source": 35, "target": 11, "value": 3},
            {"source": 35, "target": 34, "value": 3},
            {"source": 35, "target": 29, "value": 2},
            {"source": 36, "target": 34, "value": 2},
            {"source": 36, "target": 35, "value": 2},
            {"source": 36, "target": 11, "value": 2},
            {"source": 36, "target": 29, "value": 1},
            {"source": 37, "target": 34, "value": 2},
            {"source": 37, "target": 35, "value": 2},
            {"source": 37, "target": 36, "value": 2},
            {"source": 37, "target": 11, "value": 2},
            {"source": 37, "target": 29, "value": 1},
            {"source": 38, "target": 34, "value": 2},
            {"source": 38, "target": 35, "value": 2},
            {"source": 38, "target": 36, "value": 2},
            {"source": 38, "target": 37, "value": 2},
            {"source": 38, "target": 11, "value": 2},
            {"source": 38, "target": 29, "value": 1},
            {"source": 39, "target": 25, "value": 1},
            {"source": 40, "target": 25, "value": 1},
            {"source": 41, "target": 24, "value": 2},
            {"source": 41, "target": 25, "value": 3},
            {"source": 42, "target": 41, "value": 2},
            {"source": 42, "target": 25, "value": 2},
            {"source": 42, "target": 24, "value": 1},
            {"source": 43, "target": 11, "value": 3},
            {"source": 43, "target": 26, "value": 1},
            {"source": 43, "target": 27, "value": 1},
            {"source": 44, "target": 28, "value": 3},
            {"source": 44, "target": 11, "value": 1},
            {"source": 45, "target": 28, "value": 2},
            {"source": 47, "target": 46, "value": 1},
            {"source": 48, "target": 47, "value": 2},
            {"source": 48, "target": 25, "value": 1},
            {"source": 48, "target": 27, "value": 1},
            {"source": 48, "target": 11, "value": 1},
            {"source": 49, "target": 26, "value": 3},
            {"source": 49, "target": 11, "value": 2},
            {"source": 50, "target": 49, "value": 1},
            {"source": 50, "target": 24, "value": 1},
            {"source": 51, "target": 49, "value": 9},
            {"source": 51, "target": 26, "value": 2},
            {"source": 51, "target": 11, "value": 2},
            {"source": 52, "target": 51, "value": 1},
            {"source": 52, "target": 39, "value": 1},
            {"source": 53, "target": 51, "value": 1},
            {"source": 54, "target": 51, "value": 2},
            {"source": 54, "target": 49, "value": 1},
            {"source": 54, "target": 26, "value": 1},
            {"source": 55, "target": 51, "value": 6},
            {"source": 55, "target": 49, "value": 12},
            {"source": 55, "target": 39, "value": 1},
            {"source": 55, "target": 54, "value": 1},
            {"source": 55, "target": 26, "value": 21},
            {"source": 55, "target": 11, "value": 19},
            {"source": 55, "target": 16, "value": 1},
            {"source": 55, "target": 25, "value": 2},
            {"source": 55, "target": 41, "value": 5},
            {"source": 55, "target": 48, "value": 4},
            {"source": 56, "target": 49, "value": 1},
            {"source": 56, "target": 55, "value": 1},
            {"source": 57, "target": 55, "value": 1},
            {"source": 57, "target": 41, "value": 1},
            {"source": 57, "target": 48, "value": 1},
            {"source": 58, "target": 55, "value": 7},
            {"source": 58, "target": 48, "value": 7},
            {"source": 58, "target": 27, "value": 6},
            {"source": 58, "target": 57, "value": 1},
            {"source": 58, "target": 11, "value": 4},
            {"source": 59, "target": 58, "value": 15},
            {"source": 59, "target": 55, "value": 5},
            {"source": 59, "target": 48, "value": 6},
            {"source": 59, "target": 57, "value": 2},
            {"source": 60, "target": 48, "value": 1},
            {"source": 60, "target": 58, "value": 4},
            {"source": 60, "target": 59, "value": 2},
            {"source": 61, "target": 48, "value": 2},
            {"source": 61, "target": 58, "value": 6},
            {"source": 61, "target": 60, "value": 2},
            {"source": 61, "target": 59, "value": 5},
            {"source": 61, "target": 57, "value": 1},
            {"source": 61, "target": 55, "value": 1},
            {"source": 62, "target": 55, "value": 9},
            {"source": 62, "target": 58, "value": 17},
            {"source": 62, "target": 59, "value": 13},
            {"source": 62, "target": 48, "value": 7},
            {"source": 62, "target": 57, "value": 2},
            {"source": 62, "target": 41, "value": 1},
            {"source": 62, "target": 61, "value": 6},
            {"source": 62, "target": 60, "value": 3},
            {"source": 63, "target": 59, "value": 5},
            {"source": 63, "target": 48, "value": 5},
            {"source": 63, "target": 62, "value": 6},
            {"source": 63, "target": 57, "value": 2},
            {"source": 63, "target": 58, "value": 4},
            {"source": 63, "target": 61, "value": 3},
            {"source": 63, "target": 60, "value": 2},
            {"source": 63, "target": 55, "value": 1},
            {"source": 64, "target": 55, "value": 5},
            {"source": 64, "target": 62, "value": 12},
            {"source": 64, "target": 48, "value": 5},
            {"source": 64, "target": 63, "value": 4},
            {"source": 64, "target": 58, "value": 10},
            {"source": 64, "target": 61, "value": 6},
            {"source": 64, "target": 60, "value": 2},
            {"source": 64, "target": 59, "value": 9},
            {"source": 64, "target": 57, "value": 1},
            {"source": 64, "target": 11, "value": 1},
            {"source": 65, "target": 63, "value": 5},
            {"source": 65, "target": 64, "value": 7},
            {"source": 65, "target": 48, "value": 3},
            {"source": 65, "target": 62, "value": 5},
            {"source": 65, "target": 58, "value": 5},
            {"source": 65, "target": 61, "value": 5},
            {"source": 65, "target": 60, "value": 2},
            {"source": 65, "target": 59, "value": 5},
            {"source": 65, "target": 57, "value": 1},
            {"source": 65, "target": 55, "value": 2},
            {"source": 66, "target": 64, "value": 3},
            {"source": 66, "target": 58, "value": 3},
            {"source": 66, "target": 59, "value": 1},
            {"source": 66, "target": 62, "value": 2},
            {"source": 66, "target": 65, "value": 2},
            {"source": 66, "target": 48, "value": 1},
            {"source": 66, "target": 63, "value": 1},
            {"source": 66, "target": 61, "value": 1},
            {"source": 66, "target": 60, "value": 1},
            {"source": 67, "target": 57, "value": 3},
            {"source": 68, "target": 25, "value": 5},
            {"source": 68, "target": 11, "value": 1},
            {"source": 68, "target": 24, "value": 1},
            {"source": 68, "target": 27, "value": 1},
            {"source": 68, "target": 48, "value": 1},
            {"source": 68, "target": 41, "value": 1},
            {"source": 69, "target": 25, "value": 6},
            {"source": 69, "target": 68, "value": 6},
            {"source": 69, "target": 11, "value": 1},
            {"source": 69, "target": 24, "value": 1},
            {"source": 69, "target": 27, "value": 2},
            {"source": 69, "target": 48, "value": 1},
            {"source": 69, "target": 41, "value": 1},
            {"source": 70, "target": 25, "value": 4},
            {"source": 70, "target": 69, "value": 4},
            {"source": 70, "target": 68, "value": 4},
            {"source": 70, "target": 11, "value": 1},
            {"source": 70, "target": 24, "value": 1},
            {"source": 70, "target": 27, "value": 1},
            {"source": 70, "target": 41, "value": 1},
            {"source": 70, "target": 58, "value": 1},
            {"source": 71, "target": 27, "value": 1},
            {"source": 71, "target": 69, "value": 2},
            {"source": 71, "target": 68, "value": 2},
            {"source": 71, "target": 70, "value": 2},
            {"source": 71, "target": 11, "value": 1},
            {"source": 71, "target": 48, "value": 1},
            {"source": 71, "target": 41, "value": 1},
            {"source": 71, "target": 25, "value": 1},
            {"source": 72, "target": 26, "value": 2},
            {"source": 72, "target": 27, "value": 1},
            {"source": 72, "target": 11, "value": 1},
            {"source": 73, "target": 48, "value": 2},
            {"source": 74, "target": 48, "value": 2},
            {"source": 74, "target": 73, "value": 3},
            {"source": 75, "target": 69, "value": 3},
            {"source": 75, "target": 68, "value": 3},
            {"source": 75, "target": 25, "value": 3},
            {"source": 75, "target": 48, "value": 1},
            {"source": 75, "target": 41, "value": 1},
            {"source": 75, "target": 70, "value": 1},
            {"source": 75, "target": 71, "value": 1},
            {"source": 76, "target": 64, "value": 1},
            {"source": 76, "target": 65, "value": 1},
            {"source": 76, "target": 66, "value": 1},
            {"source": 76, "target": 63, "value": 1},
            {"source": 76, "target": 62, "value": 1},
            {"source": 76, "target": 48, "value": 1},
            {"source": 76, "target": 58, "value": 1}
        ]
    }
    var color = d3.scale.category20();

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([width, height]);

    var svg = d3.select(".forcechart").append("svg")
        .attr("width", width)
        .attr("height", height);


    force
        .nodes(data.nodes)
        .links(data.links)
        .start();

    var link = svg.selectAll(".link")
        .data(data.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function (d) {
            return Math.sqrt(d.value);
        });

    var node = svg.selectAll(".node")
        .data(data.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 5)
        .style("fill", function (d) {
            return color(d.group);
        })
        .call(force.drag);

    node.append("title")
        .text(function (d) {
            return d.name;
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
//
//
//barChart();
//pieChart();
//forceChart()

