'use strict';

// Declare app level module which depends on views, and components
angular.module('weatherDashboard', [
  'ngRoute',
  'weatherDashboard.version'
])
.controller('GraphsCtrl', ['$http', function($http) {
  var graph = this;
  graph.data = [];
  graph.name = 'heatAlert';
  graph.fetchData = function() {
    $http.get('http://app.toronto.ca/opendata/heat_alerts/heat_alerts_list.json')
         .success(function(data) {
           graph.data = data;
           console.log(graph.data);
         });
    console.log("Naba");
  }();
  graph.selectGraph = function(setGraph) {
    graph.name = setGraph;
  };
  graph.isSelected = function(checkGraph) {
    return graph.name == checkGraph;
  };
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/heatAlert'});
}]);
