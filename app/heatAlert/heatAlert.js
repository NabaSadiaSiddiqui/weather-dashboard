'use strict';

angular.module('weatherDashboard.heatAlert', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/heatAlert', {
    templateUrl: 'heatAlert/heatAlert.html',
    controller: 'HeatAlertCtrl'
  });
}])

.controller('HeatAlertCtrl', [function() {

}]);
