'use strict';

angular.module('pages')
	.controller('PagesCtrl', ['$scope', '$log', '$filter', '$http', '$location', 'APPCONSTANTS', 'alertsManager', function($scope, $log, $filter, $http, $location, APPCONSTANTS, alertsManager) {

		$scope.index = function() {
			$http.get(APPCONSTANTS.URL+APPCONSTANTS.API+'/pages').then(function(response) {
	            $scope.pages = response.data;
	            $log.log(response.data);
	        });
		};

		$scope.add = function() {
			$scope.page.slug = $filter('slug')($scope.page.title, '-');
			$scope.page.status_id = 1;

			$http.post(APPCONSTANTS.URL+APPCONSTANTS.API+'/pages/add', $scope.page).then(function(response) {
				if(response.data.error) {
					alertsManager.addAlert(response.data.error, 'alert-danger');
				} else {
					alertsManager.addAlert(response.data.success, 'alert-success');
					$location.path('/admin/pages');
				}
			}, function(error) {
				$log.log(error);
			});
		};
}]);