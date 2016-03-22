'use strict';

// Declare app level module which depends on views, and components
angular.module('weatherDashboard', [
  'ngRoute',
  'weatherDashboard.version',
  'chart.js'
])
.controller('GraphsCtrl', ['$http', '$scope', '$timeout', function($http, $scope, $timeout) {
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
           graph.selectGraph(graph.name);
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
    var code = graph.name == "heatAlert" ? highAlertCode : extremeHeatAlertCode;
    $scope.labels = graph.getLabels();
    $scope.series = [graph.name];
    $scope.data = [graph.getData(code)];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
  }
  graph.isSelected = function(checkGraph) {
    return graph.name == checkGraph;
  }
  graph.getLabels = function() {
    var labels = new Set();
    for(var point in graph.dataSet) {
      var year = point.split("-")[0];
      labels.add(year);
    }
    return Array.from(labels).reverse();
  }
  graph.getData = function(alertCode) {
    var data = [];
    for(var point in graph.dataSet) {
      var alertType = point.split("-")[1];
      if(alertType == alertCode) {
        data.push(graph.dataSet[point]);
      }
    }
    return data.reverse();
  }
}])
.config(['ChartJsProvider', function (ChartJsProvider) {
  // Configure all charts
  ChartJsProvider.setOptions({
    colours: ['#E35885', '#FF8A80'],
    responsive: false
  });
  // Configure all line charts
  ChartJsProvider.setOptions('Line', {
    datasetFill: false
  });
}]);
