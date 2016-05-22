angular.module('core')
	.controller('HeaderCtrl', ['$scope', 'Authentication', function($scope, Authentication) {

		$scope.logout = function() {
			Authentication.logout();
		};
}]);