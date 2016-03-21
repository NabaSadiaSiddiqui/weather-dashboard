'use strict';

// Declare app level module which depends on views, and components
angular.module('weatherDashboard', [
  'ngRoute',
  'weatherDashboard.version'
])
.controller('GraphsCtrl', function() {
    this.graph = 'heatAlert';

    this.selectGraph = function(setGraph) {
      this.graph = setGraph;
    };

    this.isSelected = function(checkGraph) {
      return this.graph == checkGraph;
    }

})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/heatAlert'});
}]);
