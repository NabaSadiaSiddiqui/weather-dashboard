'use strict';

angular.module('weatherDashboard.version', [
  'weatherDashboard.version.interpolate-filter',
  'weatherDashboard.version.version-directive'
])

.value('version', '0.1');
