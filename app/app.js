'use strict';

// Declare app level module which depends on views, and components
angular.module('weatherDashboard', [
  'ngRoute',
  'weatherDashboard.view1',
  'weatherDashboard.view2',
  'weatherDashboard.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
