'use strict';

angular.module('dashboard')
	.controller('DashboardCtrl', ['$scope', '$location', '$log', '$http', 'Authentication', 'APPCONSTANTS', 'alertsManager', function($scope, $location, $log, $http, Authentication, APPCONSTANTS, alertsManager) {

		// If user is not signed in then redirect back home
		if( !Authentication.isLoggedIn() ) $location.path('/admin/users/login');

		$scope.init = function() {
			$http.get(APPCONSTANTS.URL+APPCONSTANTS.API+'/details/view/1').then(function(response) {
	            $scope.details = response.data.Detail;
	        });
		};

		$scope.add = function() {
			$http.post(APPCONSTANTS.URL+APPCONSTANTS.API+'/details/edit/'+$scope.details.id, $scope.details).then(function(response) {
				if(response.data.error) {
					alertsManager.addAlert(response.data.error, 'alert-danger');
				} else {
					alertsManager.addAlert(response.data.success, 'alert-success');
				}
			}, function(error) {
				$log.log(error);
			});
		};
	}]);