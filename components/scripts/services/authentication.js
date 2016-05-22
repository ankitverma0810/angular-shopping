'use strict';

angular.module('shopping-cart')
	.factory('Authentication', ['$http', '$rootScope', '$location', '$cookies', '$log', 'alertsManager', 'APPCONSTANTS', function($http, $rootScope, $location, $cookies, $log, alertsManager, APPCONSTANTS) {

		var authObject =  {
			init: function() {
				$rootScope.authUser = $cookies.get('authUser');
				$rootScope.authToken = $cookies.get('authToken');

				$rootScope.$watch(function() { 
					return $cookies.get('authUser');
				}, function(authUser) {
				    $rootScope.authUser = authUser;
				});

				$rootScope.$watch(function() { 
					return $cookies.get('authToken'); 
				}, function(authToken) {
				    $rootScope.authToken = authToken;
	    			$http.defaults.headers.common['X-CSRF-Token'] = authToken;
				});
			},
			login: function(user) {
				$http.post(APPCONSTANTS.URL+APPCONSTANTS.API+'/users/login', user).then(function(response) {
					if(response.data.error) {
						alertsManager.addAlert(response.data.error, 'alert-danger');
					} else {
						this.setAuthDetails(response.data);
						$location.path('/admin/dashboard');
					}
				}.bind(this), function(error) {
					$log.log(error);
				});
			},
			logout: function() {
				$http.get(APPCONSTANTS.URL+APPCONSTANTS.API+'/users/logout').then(function(response) {
			        if(response.data.error) {
						alertsManager.addAlert(response.data.error, 'alert-danger');
					} else {
						this.deleteAuthDetails();
						$location.path('/admin/users/login');
					}
			    }.bind(this), function(error) {
			    	$log.log(error);
			    });
			},
			isLoggedIn: function() {
		    	return Boolean($cookies.get('authToken'));
		    },
			checkAuth: function(callback) {
				$http.get(APPCONSTANTS.URL+APPCONSTANTS.API+'/users/login').then(function(response) {
					if(response.data.error) {
						if('error' in callback) callback.error(response.data);
					} else {
						this.setAuthDetails(response.data);
						if('success' in callback) callback.success(response.data);
					}
			    }.bind(this), function(error) {
			    	$log.log(error);
			    	if('error' in callback) callback.error(response.data);
			    });
			},
			register: function(user) {
				$http.post(APPCONSTANTS.URL+APPCONSTANTS.API+'/users/register', user).then(function(response) {
					if(response.data.error) {
						alertsManager.addAlert(response.data.error, 'alert-danger');
					} else {
						this.setAuthDetails(response.data);
						$location.path('/admin/dashboard');
					}
				}.bind(this), function(error) {
					$log.log(error);
				});
			},
			setAuthDetails: function(data) {
				$cookies.putObject('authUser', data.user);
				$cookies.put('authToken', data.token);
			},
			deleteAuthDetails: function() {
				$cookies.remove('authUser');
				$cookies.remove('authToken');
			},
			getAuthUser: function() {
				return $cookies.get('authUser');
			}
		}

		return authObject;
	}]);