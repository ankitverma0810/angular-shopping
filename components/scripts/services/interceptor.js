'use strict';

angular.module('shopping-cart')
    .factory('authHttpResponseInterceptor', ['$q', '$location', '$cookies', '$timeout', function($q, $location, $cookies, $timeout) {
    	return {
            /*request: function(config) {
                console.log(config.method);
                config.headers['X-CSRF-Token'] = $cookies.get('authToken');
                return config;
            },*/
            response: function(response){
                if (response.status === 403) {
                    console.log("Response 403");
                }
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                if (rejection.status === 403) {
                    $timeout(function() {
                        $location.path('/admin/users/login');
                    }, 200);
                }
                return $q.reject(rejection);
            }
        }
    }]);