'use strict';

// Declare app level module which depends on views, and components
angular.module('weatherDashboard', [
  'ngRoute',
  'weatherDashboard.heatAlert',
  'weatherDashboard.extremeHeatAlert',
  'weatherDashboard.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/heatAlert'});
}]);
