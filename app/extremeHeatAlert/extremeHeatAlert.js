'use strict';

angular.module('weatherDashboard.extremeHeatAlert', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/extremeHeatAlert', {
    templateUrl: 'extremeHeatAlert/extremeHeatAlert.html',
    controller: 'ExtremeHeatAlertCtrl'
  });
}])

.controller('ExtremeHeatAlertCtrl', [function() {

}]);
