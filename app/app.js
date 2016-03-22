'use strict';

// Declare app level module which depends on views, and components
angular.module('weatherDashboard', [
  'ngRoute',
  'weatherDashboard.version',
  'chart.js'
])
.controller("LineCtrl", ['$scope', '$timeout', function ($scope, $timeout) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  // Simulate async data update
  $timeout(function () {
    $scope.data = [
      [28, 48, 40, 19, 86, 27, 90],
      [65, 59, 80, 81, 56, 55, 40]
    ];
  }, 3000);
}])
.controller('GraphsCtrl', ['$http', function($http) {
  /*
   Codes for heat alert: HA, HAE, EHAD
   Codes for extreme heat alert: EHA, HAU, EHAE
  */

  var graph = this;
  var highAlertCode = "HA";
  var extremeHeatAlertCode = "EHA";

  graph.name = 'heatAlert';
  graph.dataSet = function() {
    var lastYear = new Date().getFullYear()-1;
    var dataSet = {};
    for(var year=lastYear; year>=lastYear-10; year--) {
      dataSet[year + "-" + highAlertCode] = 0;
      dataSet[year + "-" + extremeHeatAlertCode] = 0;
    }
    return dataSet;
  }();
  graph.fetchData = function() {
    $http.get("/app/heat_alerts_list.json")
         .success(function(data) {
           for(var point in data) {
             var alert = data[point];
             var year = alert.date.split("-")[0];
             var code = alert.code
             if(code == "HA" || code == "HAE" || code == "EHAD") {
               graph.incrDataSetAtKey(year + "-" + highAlertCode);
             } else if(code == "EHA" || code == "HAU" || code == "EHAE") {
               graph.incrDataSetAtKey(year + "-" + extremeHeatAlertCode);
             }
           }
           graph.cleanDataSet();
           console.log(graph.dataSet);
         })
         .error(function(error) {
           console.log(error);
         });
  }();
  graph.cleanDataSet = function(dataSet) {
    var originalDataSet = graph.dataSet;
    var validDataSet = {}
    for(var point in originalDataSet) {
      if(!isNaN(originalDataSet[point])) {
        validDataSet[point] = originalDataSet[point];
      }
    }
    graph.dataSet = validDataSet;
  }
  graph.incrDataSetAtKey = function(key) {
    graph.dataSet[key] = graph.dataSet[key] + 1;
  }
  graph.selectGraph = function(setGraph) {
    graph.name = setGraph;
  }
  graph.isSelected = function(checkGraph) {
    return graph.name == checkGraph;
  }
}])
.config(['ChartJsProvider', function (ChartJsProvider) {
  // Configure all charts
  ChartJsProvider.setOptions({
    colours: ['#FF5252', '#FF8A80'],
    responsive: false
  });
  // Configure all line charts
  ChartJsProvider.setOptions('Line', {
    datasetFill: false
  });
}]);
