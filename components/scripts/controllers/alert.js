'use strict';

angular.module('core')
	.controller('AlertCtrl', ['$scope', 'alertsManager', function($scope, alertsManager) {
	$scope.closeAlert = function(index) {
        alertsManager.closeAlert(index);
    };	
}]);
