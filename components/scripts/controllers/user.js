angular.module('users')
	.controller('UserCtrl', ['$scope', '$location', 'Authentication', function($scope, $location, Authentication) {

		// If user is signed in then redirect back home
		if( Authentication.isLoggedIn() ) $location.path('/admin/dashboard');

		$scope.login = function() {
			Authentication.login($scope.user);
		};

		$scope.register = function() {
			Authentication.register($scope.user);
		};
	}]);