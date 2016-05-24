'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'shopping-cart';
	var applicationModuleVendorDependencies = ['ngCookies',  'ngAnimate', 'ngSanitize',  'ui.router', 'ui.bootstrap'];
	var applicationConstants = {
		SITENAME: 'Shopping Cart',
        ROOT: '/',
        URL: 'http://localhost/angular-shopping-backend',
        API: '/admin'
	};

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule,
		applicationConstants: applicationConstants
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)
	   .constant('APPCONSTANTS', ApplicationConfiguration.applicationConstants);

angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {

		//Setting HTML5 Location Mode
		//$locationProvider.html5Mode({enabled: true});

		//Http Intercpetor to check auth failures for xhr requests
		//need to check whether its working or not
		$httpProvider.interceptors.push('authHttpResponseInterceptor');
	}
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(['Authentication', function(Authentication) {
    Authentication.init();
}]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('banners');

// Setting up route
angular.module('banners').config(['$stateProvider',
	function($stateProvider) {
		// Home state routing
		$stateProvider.
		state('/admin/banners', {
            url: '/admin/banners',
            templateUrl: 'views/banners/admin_index.html',
            controller: 'BannersCtrl',
            parent: 'adminLayout'
        })
        .state('/admin/banners/add', {
            url: '/admin/banners/add',
            templateUrl: 'views/banners/admin_add.html',
            controller: 'BannersCtrl',
            parent: 'adminLayout'
        });
	}
]);
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('defaultLayout', {
			abstract: true,
            views: {
                'layout': {
                    templateUrl: 'views/layouts/default.html'
                },
                'header@defaultLayout': {
                    templateUrl: 'views/elements/header.html',
                    controller: 'HeaderCtrl'
                },
                'footer@defaultLayout': {
                    templateUrl: 'views/elements/footer.html',
                    controller: 'FooterCtrl'
                },
                'alert@defaultLayout': {
                    templateUrl: 'views/layouts/alert.html',
                    controller: 'AlertCtrl'
                }
            }
		})
        .state('adminLayout', {
            abstract: true,
            views: {
                'layout': {
                    templateUrl: 'views/layouts/admin.html'
                },
                'header@adminLayout': {
                    templateUrl: 'views/elements/admin/header.html',
                    controller: 'HeaderCtrl'
                },
                'footer@adminLayout': {
                    templateUrl: 'views/elements/admin/footer.html'
                },
                'sidebar@adminLayout': {
                    templateUrl: 'views/elements/admin/sidebar.html',
                    controller: 'SidebarCtrl'
                },
                'alert@adminLayout': {
                    templateUrl: 'views/layouts/alert.html',
                    controller: 'AlertCtrl'
                }
            }
        })
        .state('loginLayout', {
            abstract: true,
            views: {
                'layout': {
                    templateUrl: 'views/layouts/login.html'
                },
                'alert@loginLayout': {
                    templateUrl: 'views/layouts/alert.html',
                    controller: 'AlertCtrl'
                }
            }
        });
	}
]);
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('dashboard');

// Setting up route
angular.module('dashboard').config(['$stateProvider',
	function($stateProvider) {
		// Home state routing
		$stateProvider.
		state('/admin/dashboard', {
            url: '/admin/dashboard',
            templateUrl: 'views/dashboard/admin_index.html',
            controller: 'DashboardCtrl',
            parent: 'adminLayout'
        });
	}
]);
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('pages');

// Setting up route
angular.module('pages').config(['$stateProvider',
	function($stateProvider) {
		// Home state routing
		$stateProvider.
		state('home', {
            url: '/',
            templateUrl: 'views/pages/home.html',
            controller: 'PagesCtrl',
            parent: 'defaultLayout'
        })
        .state('checkout', {
            url: '/pages/checkout',
            templateUrl: 'views/pages/checkout.html',
            controller: 'PagesCtrl',
            parent: 'defaultLayout'
        })
        .state('/admin/pages', {
            url: '/admin/pages',
            templateUrl: 'views/pages/admin_index.html',
            controller: 'PagesCtrl',
            parent: 'adminLayout'
        })
        .state('/admin/pages/add', {
            url: '/admin/pages/add',
            templateUrl: 'views/pages/admin_add.html',
            controller: 'PagesCtrl',
            parent: 'adminLayout'
        });
	}
]);
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('products');

// Setting up route
angular.module('products').config(['$stateProvider',
	function($stateProvider) {
		// user state routing
		$stateProvider.
		state('products', {
            url: '/products',
            templateUrl: 'views/products/index.html',
            controller: 'ProductCtrl',
            parent: 'defaultLayout'
        })
        .state('/admin/products', {
            url: '/admin/products',
            templateUrl: 'views/products/admin_index.html',
            controller: 'ProductCtrl',
            parent: 'adminLayout'
        })
        .state('/admin/products/add', {
            url: '/admin/products/add',
            templateUrl: 'views/products/admin_add.html',
            controller: 'ProductCtrl',
            parent: 'adminLayout'
        });
	}
]);
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// user state routing
		$stateProvider.
		state('login', {
            url: '/users/login',
            templateUrl: 'views/users/login.html',
            controller: 'UserCtrl',
            parent: 'defaultLayout'
        })
        .state('register', {
            url: '/users/register',
            templateUrl: 'views/users/register.html',
            controller: 'UserCtrl',
            parent: 'defaultLayout'
        })
        .state('admin/login', {
            url: '/admin/users/login',
            templateUrl: 'views/users/admin_login.html',
            controller: 'UserCtrl',
            parent: 'loginLayout'
        })
        .state('admin/register', {
            url: '/admin/users/register',
            templateUrl: 'views/users/admin_register.html',
            controller: 'UserCtrl',
            parent: 'loginLayout'
        })
        .state('admin/forgotpassword', {
            url: '/admin/users/forgot-password',
            templateUrl: 'views/users/admin_forgot_password.html',
            controller: 'UserCtrl',
            parent: 'loginLayout'
        });
	}
]);
'use strict';

angular.module('core')
	.controller('AlertCtrl', ['$scope', 'alertsManager', function($scope, alertsManager) {
	$scope.closeAlert = function(index) {
        alertsManager.closeAlert(index);
    };	
}]);

angular.module('banners')
	.controller('BannersCtrl', ['$scope', function($scope) {
}]);
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
angular.module('core')
	.controller('FooterCtrl', ['$scope', function($scope) {	
}]);
angular.module('core')
	.controller('HeaderCtrl', ['$scope', 'Authentication', function($scope, Authentication) {

		$scope.logout = function() {
			Authentication.logout();
		};
}]);
'use strict';

angular.module('pages')
	.controller('PagesCtrl', ['$scope', '$log', '$filter', '$http', '$location', 'APPCONSTANTS', 'alertsManager', function($scope, $log, $filter, $http, $location, APPCONSTANTS, alertsManager) {

		$scope.index = function() {
			$http.get(APPCONSTANTS.URL+APPCONSTANTS.API+'/pages').then(function(response) {
	            $scope.pages = response.data;
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

		$scope.status = function(id, status, index) {
			$http.get(APPCONSTANTS.URL+APPCONSTANTS.API+'/pages/setstatus/'+id+'/'+status).then(function(response) {
				if(response.data.error) {
					alertsManager.addAlert(response.data.error, 'alert-danger');
				} else {
					alertsManager.addAlert(response.data.success, 'alert-success');
					$scope.pages[index]['Page']['status_id'] = status.toString();
				}
			}, function(error) {
				$log.log(error);
			});
		};

		$scope.sort = function(keyname) {
	        $scope.sortKey = keyname;   //set the sortKey to the param passed
	        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
	    }
}]);
angular.module('products')
	.controller('ProductCtrl', ['$scope', function($scope) {
}]);
angular.module('core')
	.controller('SidebarCtrl', ['$scope', '$location', '$state', '$timeout', function($scope, $location, $state, $timeout) {

		$scope.currentUrl = $state.current.url;

		$scope.init = function() {
			$scope.groups = $scope.getGroups();
			$scope.categories = $scope.getCategories();

			$timeout(function(){
		        angular.forEach($scope.groups, function(value, key) {
					if( value.subMenu !== undefined ) {
						angular.forEach(value.subMenu, function(innerValue, innerKey) {
							if( $state.current.url === innerValue.url ) {
								$('#'+value.title).collapse('show'); //for opening active tab
								$scope.groups[key].isOpen = true; //for showing right/down glyphicon icons on active tab
							}
						});
					}
				});
		    });
		};

		$scope.getGroups = function() {
			return [
				{
					title: 'Dashboard',
					url: '/admin/dashboard'
				},
				{
					title: 'Pages',
					subMenu: [
						{title: 'List pages', url: '/admin/pages'},
						{title: 'Add page', url: '/admin/pages/add'}
					]
				},
				{
					title: 'Banners',
					subMenu: [
						{title: 'List banners', url: '/admin/banners'},
						{title: 'Add banner', url: '/admin/banners/add'}
					]
				},
				{
					title: 'Categories',
					subMenu: [
						{title: 'List categories', url: '/admin/categories'},
						{title: 'Add category', url: '/admin/categories/add'}
					]
				},
				{
					title: 'Subcategories',
					subMenu: [
						{title: 'List subcategories', url: '/admin/subcategories'},
						{title: 'Add subcategory', url: '/admin/subcategories/add'}
					]
				},
				{
					title: 'Products',
					subMenu: [
						{title: 'List products', url: '/admin/products'},
						{title: 'Add product', url: '/admin/products/add'}
					]
				},
				{
					title: 'Attributes',
					subMenu: [
						{title: 'List attributes', url: '/admin/attributes'},
						{title: 'Add attribute', url: '/admin/attributes/add'}
					]
				},
				{
					title: 'Users',
					subMenu: [
						{title: 'List users', url: '/admin/users'},
						{title: 'Add user', url: '/admin/users/add'}
					]
				},
				{
					title: 'Roles',
					subMenu: [
						{title: 'List roles', url: '/admin/roles'},
						{title: 'Add role', url: '/admin/roles/add'}
					]
				},
				{
					title: 'Privileges',
					subMenu: [
						{title: 'List privileges', url: '/admin/privileges'},
						{title: 'Add privilege', url: '/admin/privileges/add'}
					]
				}
			];
		};

		$scope.getCategories = function() {
			return [
				{
					title: 'Men',
					content: [
						'Cute Kittens', 'Strange Stuff', 'Automatic Fails'
					]
				},
				{
					title: 'Women',
					content: [
						'Cute Kittens', 'Strange Stuff', 'Automatic Fails'
					]
				},
				{
					title: 'Kids',
					content: [
						'Cute Kittens', 'Strange Stuff', 'Automatic Fails'
					]
				},
				{
					title: 'Accesories',
					content: [
						'Cute Kittens', 'Strange Stuff', 'Automatic Fails'
					]
				},
				{
					title: 'Shoes'
				}
			];
		};

		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			$scope.currentUrl = toState.url;
	    });
	}]);
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
'use strict';

angular.module('core')
	.filter('slug', ['$filter', function($filter) {
		return function(word, replacement ) {
	        if (!angular.isString(word)) {
	            return word;
	        }
	        return $filter('lowercase')(word.replace(/\s+/g, replacement));
	    };
	}]);
'use strict';

angular.module('shopping-cart')
    .factory('alertsManager', ['$rootScope', '$timeout', function($rootScope, $timeout) {
        var messageTimer = false,
            displayDuration = 8000;

        $rootScope.alertMessage = {};
        $rootScope.showAlert = false;

        return {
            addAlert: function(message, type) {
                if (messageTimer) {
                    $timeout.cancel(messageTimer);
                }

                $rootScope.showAlert = true;
                $rootScope.alertMessage = {type: type, message: message};

                messageTimer = $timeout(function () {
                    $rootScope.alertMessage = {};
                    $rootScope.showAlert = false;
                }, displayDuration);
            },
            closeAlert: function() {
                $rootScope.alertMessage = {};
                $rootScope.showAlert = false;
                $timeout.cancel(messageTimer);
            }
        };
    }]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImFwcC5qcyIsImJhbm5lcnMuanMiLCJjb3JlLmpzIiwiZGFzaGJvYXJkLmpzIiwicGFnZXMuanMiLCJwcm9kdWN0cy5qcyIsInVzZXJzLmpzIiwiY29udHJvbGxlcnMvYWxlcnQuanMiLCJjb250cm9sbGVycy9iYW5uZXIuanMiLCJjb250cm9sbGVycy9kYXNoYm9hcmQuanMiLCJjb250cm9sbGVycy9mb290ZXIuanMiLCJjb250cm9sbGVycy9oZWFkZXIuanMiLCJjb250cm9sbGVycy9wYWdlLmpzIiwiY29udHJvbGxlcnMvcHJvZHVjdC5qcyIsImNvbnRyb2xsZXJzL3NpZGViYXIuanMiLCJjb250cm9sbGVycy91c2VyLmpzIiwiZmlsdGVycy9jb3JlLmpzIiwic2VydmljZXMvYWxlcnRzTWFuYWdlci5qcyIsInNlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLmpzIiwic2VydmljZXMvaW50ZXJjZXB0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gSW5pdCB0aGUgYXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBtb2R1bGUgZm9yIEFuZ3VsYXJKUyBhcHBsaWNhdGlvblxyXG52YXIgQXBwbGljYXRpb25Db25maWd1cmF0aW9uID0gKGZ1bmN0aW9uKCkge1xyXG5cdC8vIEluaXQgbW9kdWxlIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xyXG5cdHZhciBhcHBsaWNhdGlvbk1vZHVsZU5hbWUgPSAnc2hvcHBpbmctY2FydCc7XHJcblx0dmFyIGFwcGxpY2F0aW9uTW9kdWxlVmVuZG9yRGVwZW5kZW5jaWVzID0gWyduZ0Nvb2tpZXMnLCAgJ25nQW5pbWF0ZScsICduZ1Nhbml0aXplJywgICd1aS5yb3V0ZXInLCAndWkuYm9vdHN0cmFwJ107XHJcblx0dmFyIGFwcGxpY2F0aW9uQ29uc3RhbnRzID0ge1xyXG5cdFx0U0lURU5BTUU6ICdTaG9wcGluZyBDYXJ0JyxcclxuICAgICAgICBST09UOiAnLycsXHJcbiAgICAgICAgVVJMOiAnaHR0cDovL2xvY2FsaG9zdC9hbmd1bGFyLXNob3BwaW5nLWJhY2tlbmQnLFxyXG4gICAgICAgIEFQSTogJy9hZG1pbidcclxuXHR9O1xyXG5cclxuXHQvLyBBZGQgYSBuZXcgdmVydGljYWwgbW9kdWxlXHJcblx0dmFyIHJlZ2lzdGVyTW9kdWxlID0gZnVuY3Rpb24obW9kdWxlTmFtZSwgZGVwZW5kZW5jaWVzKSB7XHJcblx0XHQvLyBDcmVhdGUgYW5ndWxhciBtb2R1bGVcclxuXHRcdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIGRlcGVuZGVuY2llcyB8fCBbXSk7XHJcblxyXG5cdFx0Ly8gQWRkIHRoZSBtb2R1bGUgdG8gdGhlIEFuZ3VsYXJKUyBjb25maWd1cmF0aW9uIGZpbGVcclxuXHRcdGFuZ3VsYXIubW9kdWxlKGFwcGxpY2F0aW9uTW9kdWxlTmFtZSkucmVxdWlyZXMucHVzaChtb2R1bGVOYW1lKTtcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0YXBwbGljYXRpb25Nb2R1bGVOYW1lOiBhcHBsaWNhdGlvbk1vZHVsZU5hbWUsXHJcblx0XHRhcHBsaWNhdGlvbk1vZHVsZVZlbmRvckRlcGVuZGVuY2llczogYXBwbGljYXRpb25Nb2R1bGVWZW5kb3JEZXBlbmRlbmNpZXMsXHJcblx0XHRyZWdpc3Rlck1vZHVsZTogcmVnaXN0ZXJNb2R1bGUsXHJcblx0XHRhcHBsaWNhdGlvbkNvbnN0YW50czogYXBwbGljYXRpb25Db25zdGFudHNcclxuXHR9O1xyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vU3RhcnQgYnkgZGVmaW5pbmcgdGhlIG1haW4gbW9kdWxlIGFuZCBhZGRpbmcgdGhlIG1vZHVsZSBkZXBlbmRlbmNpZXNcclxuYW5ndWxhci5tb2R1bGUoQXBwbGljYXRpb25Db25maWd1cmF0aW9uLmFwcGxpY2F0aW9uTW9kdWxlTmFtZSwgQXBwbGljYXRpb25Db25maWd1cmF0aW9uLmFwcGxpY2F0aW9uTW9kdWxlVmVuZG9yRGVwZW5kZW5jaWVzKVxyXG5cdCAgIC5jb25zdGFudCgnQVBQQ09OU1RBTlRTJywgQXBwbGljYXRpb25Db25maWd1cmF0aW9uLmFwcGxpY2F0aW9uQ29uc3RhbnRzKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbk1vZHVsZU5hbWUpLmNvbmZpZyhbJyRsb2NhdGlvblByb3ZpZGVyJywgJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlciwgJGh0dHBQcm92aWRlcikge1xyXG5cclxuXHRcdC8vU2V0dGluZyBIVE1MNSBMb2NhdGlvbiBNb2RlXHJcblx0XHQvLyRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh7ZW5hYmxlZDogdHJ1ZX0pO1xyXG5cclxuXHRcdC8vSHR0cCBJbnRlcmNwZXRvciB0byBjaGVjayBhdXRoIGZhaWx1cmVzIGZvciB4aHIgcmVxdWVzdHNcclxuXHRcdC8vbmVlZCB0byBjaGVjayB3aGV0aGVyIGl0cyB3b3JraW5nIG9yIG5vdFxyXG5cdFx0JGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnYXV0aEh0dHBSZXNwb25zZUludGVyY2VwdG9yJyk7XHJcblx0fVxyXG5dKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbk1vZHVsZU5hbWUpLnJ1bihbJ0F1dGhlbnRpY2F0aW9uJywgZnVuY3Rpb24oQXV0aGVudGljYXRpb24pIHtcclxuICAgIEF1dGhlbnRpY2F0aW9uLmluaXQoKTtcclxufV0pO1xyXG5cclxuLy9UaGVuIGRlZmluZSB0aGUgaW5pdCBmdW5jdGlvbiBmb3Igc3RhcnRpbmcgdXAgdGhlIGFwcGxpY2F0aW9uXHJcbmFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0Ly9UaGVuIGluaXQgdGhlIGFwcFxyXG5cdGFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbQXBwbGljYXRpb25Db25maWd1cmF0aW9uLmFwcGxpY2F0aW9uTW9kdWxlTmFtZV0pO1xyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBVc2UgQXBwbGljYWlvbiBjb25maWd1cmF0aW9uIG1vZHVsZSB0byByZWdpc3RlciBhIG5ldyBtb2R1bGVcclxuQXBwbGljYXRpb25Db25maWd1cmF0aW9uLnJlZ2lzdGVyTW9kdWxlKCdiYW5uZXJzJyk7XHJcblxyXG4vLyBTZXR0aW5nIHVwIHJvdXRlXHJcbmFuZ3VsYXIubW9kdWxlKCdiYW5uZXJzJykuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLFxyXG5cdGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblx0XHQvLyBIb21lIHN0YXRlIHJvdXRpbmdcclxuXHRcdCRzdGF0ZVByb3ZpZGVyLlxyXG5cdFx0c3RhdGUoJy9hZG1pbi9iYW5uZXJzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vYmFubmVycycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvYmFubmVycy9hZG1pbl9pbmRleC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0Jhbm5lcnNDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnYWRtaW5MYXlvdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJy9hZG1pbi9iYW5uZXJzL2FkZCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkbWluL2Jhbm5lcnMvYWRkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9iYW5uZXJzL2FkbWluX2FkZC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0Jhbm5lcnNDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnYWRtaW5MYXlvdXQnXHJcbiAgICAgICAgfSk7XHJcblx0fVxyXG5dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBVc2UgQXBwbGljYWlvbiBjb25maWd1cmF0aW9uIG1vZHVsZSB0byByZWdpc3RlciBhIG5ldyBtb2R1bGVcclxuQXBwbGljYXRpb25Db25maWd1cmF0aW9uLnJlZ2lzdGVyTW9kdWxlKCdjb3JlJyk7XHJcblxyXG4vLyBTZXR0aW5nIHVwIHJvdXRlXHJcbmFuZ3VsYXIubW9kdWxlKCdjb3JlJykuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJyxcclxuXHRmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcblx0XHQvLyBSZWRpcmVjdCB0byBob21lIHZpZXcgd2hlbiByb3V0ZSBub3QgZm91bmRcclxuXHRcdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuXHJcblx0XHQvLyBIb21lIHN0YXRlIHJvdXRpbmdcclxuXHRcdCRzdGF0ZVByb3ZpZGVyLlxyXG5cdFx0c3RhdGUoJ2RlZmF1bHRMYXlvdXQnLCB7XHJcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgJ2xheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2xheW91dHMvZGVmYXVsdC5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdoZWFkZXJAZGVmYXVsdExheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2VsZW1lbnRzL2hlYWRlci5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSGVhZGVyQ3RybCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnZm9vdGVyQGRlZmF1bHRMYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9lbGVtZW50cy9mb290ZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0Zvb3RlckN0cmwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2FsZXJ0QGRlZmF1bHRMYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9sYXlvdXRzL2FsZXJ0Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBbGVydEN0cmwnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH0pXHJcbiAgICAgICAgLnN0YXRlKCdhZG1pbkxheW91dCcsIHtcclxuICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAnbGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbGF5b3V0cy9hZG1pbi5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdoZWFkZXJAYWRtaW5MYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9lbGVtZW50cy9hZG1pbi9oZWFkZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hlYWRlckN0cmwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2Zvb3RlckBhZG1pbkxheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2VsZW1lbnRzL2FkbWluL2Zvb3Rlci5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdzaWRlYmFyQGFkbWluTGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZWxlbWVudHMvYWRtaW4vc2lkZWJhci5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnU2lkZWJhckN0cmwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2FsZXJ0QGFkbWluTGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbGF5b3V0cy9hbGVydC5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQWxlcnRDdHJsJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2xvZ2luTGF5b3V0Jywge1xyXG4gICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICdsYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9sYXlvdXRzL2xvZ2luLmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2FsZXJ0QGxvZ2luTGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbGF5b3V0cy9hbGVydC5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQWxlcnRDdHJsJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblx0fVxyXG5dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBVc2UgQXBwbGljYWlvbiBjb25maWd1cmF0aW9uIG1vZHVsZSB0byByZWdpc3RlciBhIG5ldyBtb2R1bGVcclxuQXBwbGljYXRpb25Db25maWd1cmF0aW9uLnJlZ2lzdGVyTW9kdWxlKCdkYXNoYm9hcmQnKTtcclxuXHJcbi8vIFNldHRpbmcgdXAgcm91dGVcclxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJyxcclxuXHRmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xyXG5cdFx0Ly8gSG9tZSBzdGF0ZSByb3V0aW5nXHJcblx0XHQkc3RhdGVQcm92aWRlci5cclxuXHRcdHN0YXRlKCcvYWRtaW4vZGFzaGJvYXJkJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvYWRtaW5faW5kZXguaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEYXNoYm9hcmRDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnYWRtaW5MYXlvdXQnXHJcbiAgICAgICAgfSk7XHJcblx0fVxyXG5dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBVc2UgQXBwbGljYWlvbiBjb25maWd1cmF0aW9uIG1vZHVsZSB0byByZWdpc3RlciBhIG5ldyBtb2R1bGVcclxuQXBwbGljYXRpb25Db25maWd1cmF0aW9uLnJlZ2lzdGVyTW9kdWxlKCdwYWdlcycpO1xyXG5cclxuLy8gU2V0dGluZyB1cCByb3V0ZVxyXG5hbmd1bGFyLm1vZHVsZSgncGFnZXMnKS5jb25maWcoWyckc3RhdGVQcm92aWRlcicsXHJcblx0ZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcclxuXHRcdC8vIEhvbWUgc3RhdGUgcm91dGluZ1xyXG5cdFx0JHN0YXRlUHJvdmlkZXIuXHJcblx0XHRzdGF0ZSgnaG9tZScsIHtcclxuICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcGFnZXMvaG9tZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1BhZ2VzQ3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2RlZmF1bHRMYXlvdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2NoZWNrb3V0Jywge1xyXG4gICAgICAgICAgICB1cmw6ICcvcGFnZXMvY2hlY2tvdXQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3BhZ2VzL2NoZWNrb3V0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUGFnZXNDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGVmYXVsdExheW91dCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnL2FkbWluL3BhZ2VzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vcGFnZXMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3BhZ2VzL2FkbWluX2luZGV4Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUGFnZXNDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnYWRtaW5MYXlvdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJy9hZG1pbi9wYWdlcy9hZGQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZG1pbi9wYWdlcy9hZGQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3BhZ2VzL2FkbWluX2FkZC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1BhZ2VzQ3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2FkbWluTGF5b3V0J1xyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gVXNlIEFwcGxpY2Fpb24gY29uZmlndXJhdGlvbiBtb2R1bGUgdG8gcmVnaXN0ZXIgYSBuZXcgbW9kdWxlXHJcbkFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5yZWdpc3Rlck1vZHVsZSgncHJvZHVjdHMnKTtcclxuXHJcbi8vIFNldHRpbmcgdXAgcm91dGVcclxuYW5ndWxhci5tb2R1bGUoJ3Byb2R1Y3RzJykuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLFxyXG5cdGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblx0XHQvLyB1c2VyIHN0YXRlIHJvdXRpbmdcclxuXHRcdCRzdGF0ZVByb3ZpZGVyLlxyXG5cdFx0c3RhdGUoJ3Byb2R1Y3RzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvcHJvZHVjdHMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3Byb2R1Y3RzL2luZGV4Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUHJvZHVjdEN0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkZWZhdWx0TGF5b3V0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCcvYWRtaW4vcHJvZHVjdHMnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZG1pbi9wcm9kdWN0cycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcHJvZHVjdHMvYWRtaW5faW5kZXguaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9kdWN0Q3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2FkbWluTGF5b3V0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCcvYWRtaW4vcHJvZHVjdHMvYWRkJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vcHJvZHVjdHMvYWRkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9wcm9kdWN0cy9hZG1pbl9hZGQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9kdWN0Q3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2FkbWluTGF5b3V0J1xyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gVXNlIEFwcGxpY2Fpb24gY29uZmlndXJhdGlvbiBtb2R1bGUgdG8gcmVnaXN0ZXIgYSBuZXcgbW9kdWxlXHJcbkFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5yZWdpc3Rlck1vZHVsZSgndXNlcnMnKTtcclxuXHJcbi8vIFNldHRpbmcgdXAgcm91dGVcclxuYW5ndWxhci5tb2R1bGUoJ3VzZXJzJykuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLFxyXG5cdGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblx0XHQvLyB1c2VyIHN0YXRlIHJvdXRpbmdcclxuXHRcdCRzdGF0ZVByb3ZpZGVyLlxyXG5cdFx0c3RhdGUoJ2xvZ2luJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvdXNlcnMvbG9naW4nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3VzZXJzL2xvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnVXNlckN0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkZWZhdWx0TGF5b3V0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdyZWdpc3RlcicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3VzZXJzL3JlZ2lzdGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy91c2Vycy9yZWdpc3Rlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1VzZXJDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGVmYXVsdExheW91dCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWRtaW4vbG9naW4nLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZG1pbi91c2Vycy9sb2dpbicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvdXNlcnMvYWRtaW5fbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyQ3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2xvZ2luTGF5b3V0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhZG1pbi9yZWdpc3RlcicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkbWluL3VzZXJzL3JlZ2lzdGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy91c2Vycy9hZG1pbl9yZWdpc3Rlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1VzZXJDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnbG9naW5MYXlvdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2FkbWluL2ZvcmdvdHBhc3N3b3JkJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vdXNlcnMvZm9yZ290LXBhc3N3b3JkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy91c2Vycy9hZG1pbl9mb3Jnb3RfcGFzc3dvcmQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyQ3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2xvZ2luTGF5b3V0J1xyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2NvcmUnKVxyXG5cdC5jb250cm9sbGVyKCdBbGVydEN0cmwnLCBbJyRzY29wZScsICdhbGVydHNNYW5hZ2VyJywgZnVuY3Rpb24oJHNjb3BlLCBhbGVydHNNYW5hZ2VyKSB7XHJcblx0JHNjb3BlLmNsb3NlQWxlcnQgPSBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgIGFsZXJ0c01hbmFnZXIuY2xvc2VBbGVydChpbmRleCk7XHJcbiAgICB9O1x0XHJcbn1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jhbm5lcnMnKVxyXG5cdC5jb250cm9sbGVyKCdCYW5uZXJzQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbn1dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcclxuXHQuY29udHJvbGxlcignRGFzaGJvYXJkQ3RybCcsIFsnJHNjb3BlJywgJyRsb2NhdGlvbicsICckbG9nJywgJyRodHRwJywgJ0F1dGhlbnRpY2F0aW9uJywgJ0FQUENPTlNUQU5UUycsICdhbGVydHNNYW5hZ2VyJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sICRsb2csICRodHRwLCBBdXRoZW50aWNhdGlvbiwgQVBQQ09OU1RBTlRTLCBhbGVydHNNYW5hZ2VyKSB7XHJcblxyXG5cdFx0Ly8gSWYgdXNlciBpcyBub3Qgc2lnbmVkIGluIHRoZW4gcmVkaXJlY3QgYmFjayBob21lXHJcblx0XHRpZiggIUF1dGhlbnRpY2F0aW9uLmlzTG9nZ2VkSW4oKSApICRsb2NhdGlvbi5wYXRoKCcvYWRtaW4vdXNlcnMvbG9naW4nKTtcclxuXHJcblx0XHQkc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkaHR0cC5nZXQoQVBQQ09OU1RBTlRTLlVSTCtBUFBDT05TVEFOVFMuQVBJKycvZGV0YWlscy92aWV3LzEnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0ICAgICAgICAgICAgJHNjb3BlLmRldGFpbHMgPSByZXNwb25zZS5kYXRhLkRldGFpbDtcclxuXHQgICAgICAgIH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuYWRkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRodHRwLnBvc3QoQVBQQ09OU1RBTlRTLlVSTCtBUFBDT05TVEFOVFMuQVBJKycvZGV0YWlscy9lZGl0LycrJHNjb3BlLmRldGFpbHMuaWQsICRzY29wZS5kZXRhaWxzKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0aWYocmVzcG9uc2UuZGF0YS5lcnJvcikge1xyXG5cdFx0XHRcdFx0YWxlcnRzTWFuYWdlci5hZGRBbGVydChyZXNwb25zZS5kYXRhLmVycm9yLCAnYWxlcnQtZGFuZ2VyJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGFsZXJ0c01hbmFnZXIuYWRkQWxlcnQocmVzcG9uc2UuZGF0YS5zdWNjZXNzLCAnYWxlcnQtc3VjY2VzcycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHQkbG9nLmxvZyhlcnJvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHR9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2NvcmUnKVxyXG5cdC5jb250cm9sbGVyKCdGb290ZXJDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcdFxyXG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2NvcmUnKVxyXG5cdC5jb250cm9sbGVyKCdIZWFkZXJDdHJsJywgWyckc2NvcGUnLCAnQXV0aGVudGljYXRpb24nLCBmdW5jdGlvbigkc2NvcGUsIEF1dGhlbnRpY2F0aW9uKSB7XHJcblxyXG5cdFx0JHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRBdXRoZW50aWNhdGlvbi5sb2dvdXQoKTtcclxuXHRcdH07XHJcbn1dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGFnZXMnKVxyXG5cdC5jb250cm9sbGVyKCdQYWdlc0N0cmwnLCBbJyRzY29wZScsICckbG9nJywgJyRmaWx0ZXInLCAnJGh0dHAnLCAnJGxvY2F0aW9uJywgJ0FQUENPTlNUQU5UUycsICdhbGVydHNNYW5hZ2VyJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9nLCAkZmlsdGVyLCAkaHR0cCwgJGxvY2F0aW9uLCBBUFBDT05TVEFOVFMsIGFsZXJ0c01hbmFnZXIpIHtcclxuXHJcblx0XHQkc2NvcGUuaW5kZXggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0JGh0dHAuZ2V0KEFQUENPTlNUQU5UUy5VUkwrQVBQQ09OU1RBTlRTLkFQSSsnL3BhZ2VzJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdCAgICAgICAgICAgICRzY29wZS5wYWdlcyA9IHJlc3BvbnNlLmRhdGE7XHJcblx0ICAgICAgICB9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0JHNjb3BlLmFkZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkc2NvcGUucGFnZS5zbHVnID0gJGZpbHRlcignc2x1ZycpKCRzY29wZS5wYWdlLnRpdGxlLCAnLScpO1xyXG5cdFx0XHQkc2NvcGUucGFnZS5zdGF0dXNfaWQgPSAxO1xyXG5cclxuXHRcdFx0JGh0dHAucG9zdChBUFBDT05TVEFOVFMuVVJMK0FQUENPTlNUQU5UUy5BUEkrJy9wYWdlcy9hZGQnLCAkc2NvcGUucGFnZSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdGlmKHJlc3BvbnNlLmRhdGEuZXJyb3IpIHtcclxuXHRcdFx0XHRcdGFsZXJ0c01hbmFnZXIuYWRkQWxlcnQocmVzcG9uc2UuZGF0YS5lcnJvciwgJ2FsZXJ0LWRhbmdlcicpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhbGVydHNNYW5hZ2VyLmFkZEFsZXJ0KHJlc3BvbnNlLmRhdGEuc3VjY2VzcywgJ2FsZXJ0LXN1Y2Nlc3MnKTtcclxuXHRcdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvYWRtaW4vcGFnZXMnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdFx0JGxvZy5sb2coZXJyb3IpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0JHNjb3BlLnN0YXR1cyA9IGZ1bmN0aW9uKGlkLCBzdGF0dXMsIGluZGV4KSB7XHJcblx0XHRcdCRodHRwLmdldChBUFBDT05TVEFOVFMuVVJMK0FQUENPTlNUQU5UUy5BUEkrJy9wYWdlcy9zZXRzdGF0dXMvJytpZCsnLycrc3RhdHVzKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0aWYocmVzcG9uc2UuZGF0YS5lcnJvcikge1xyXG5cdFx0XHRcdFx0YWxlcnRzTWFuYWdlci5hZGRBbGVydChyZXNwb25zZS5kYXRhLmVycm9yLCAnYWxlcnQtZGFuZ2VyJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGFsZXJ0c01hbmFnZXIuYWRkQWxlcnQocmVzcG9uc2UuZGF0YS5zdWNjZXNzLCAnYWxlcnQtc3VjY2VzcycpO1xyXG5cdFx0XHRcdFx0JHNjb3BlLnBhZ2VzW2luZGV4XVsnUGFnZSddWydzdGF0dXNfaWQnXSA9IHN0YXR1cy50b1N0cmluZygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHQkbG9nLmxvZyhlcnJvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuc29ydCA9IGZ1bmN0aW9uKGtleW5hbWUpIHtcclxuXHQgICAgICAgICRzY29wZS5zb3J0S2V5ID0ga2V5bmFtZTsgICAvL3NldCB0aGUgc29ydEtleSB0byB0aGUgcGFyYW0gcGFzc2VkXHJcblx0ICAgICAgICAkc2NvcGUucmV2ZXJzZSA9ICEkc2NvcGUucmV2ZXJzZTsgLy9pZiB0cnVlIG1ha2UgaXQgZmFsc2UgYW5kIHZpY2UgdmVyc2FcclxuXHQgICAgfVxyXG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ3Byb2R1Y3RzJylcclxuXHQuY29udHJvbGxlcignUHJvZHVjdEN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2NvcmUnKVxyXG5cdC5jb250cm9sbGVyKCdTaWRlYmFyQ3RybCcsIFsnJHNjb3BlJywgJyRsb2NhdGlvbicsICckc3RhdGUnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbiwgJHN0YXRlLCAkdGltZW91dCkge1xyXG5cclxuXHRcdCRzY29wZS5jdXJyZW50VXJsID0gJHN0YXRlLmN1cnJlbnQudXJsO1xyXG5cclxuXHRcdCRzY29wZS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRzY29wZS5ncm91cHMgPSAkc2NvcGUuZ2V0R3JvdXBzKCk7XHJcblx0XHRcdCRzY29wZS5jYXRlZ29yaWVzID0gJHNjb3BlLmdldENhdGVnb3JpZXMoKTtcclxuXHJcblx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHQgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZ3JvdXBzLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XHJcblx0XHRcdFx0XHRpZiggdmFsdWUuc3ViTWVudSAhPT0gdW5kZWZpbmVkICkge1xyXG5cdFx0XHRcdFx0XHRhbmd1bGFyLmZvckVhY2godmFsdWUuc3ViTWVudSwgZnVuY3Rpb24oaW5uZXJWYWx1ZSwgaW5uZXJLZXkpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiggJHN0YXRlLmN1cnJlbnQudXJsID09PSBpbm5lclZhbHVlLnVybCApIHtcclxuXHRcdFx0XHRcdFx0XHRcdCQoJyMnK3ZhbHVlLnRpdGxlKS5jb2xsYXBzZSgnc2hvdycpOyAvL2ZvciBvcGVuaW5nIGFjdGl2ZSB0YWJcclxuXHRcdFx0XHRcdFx0XHRcdCRzY29wZS5ncm91cHNba2V5XS5pc09wZW4gPSB0cnVlOyAvL2ZvciBzaG93aW5nIHJpZ2h0L2Rvd24gZ2x5cGhpY29uIGljb25zIG9uIGFjdGl2ZSB0YWJcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0ICAgIH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuZ2V0R3JvdXBzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdEYXNoYm9hcmQnLFxyXG5cdFx0XHRcdFx0dXJsOiAnL2FkbWluL2Rhc2hib2FyZCdcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnUGFnZXMnLFxyXG5cdFx0XHRcdFx0c3ViTWVudTogW1xyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdMaXN0IHBhZ2VzJywgdXJsOiAnL2FkbWluL3BhZ2VzJ30sXHJcblx0XHRcdFx0XHRcdHt0aXRsZTogJ0FkZCBwYWdlJywgdXJsOiAnL2FkbWluL3BhZ2VzL2FkZCd9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ0Jhbm5lcnMnLFxyXG5cdFx0XHRcdFx0c3ViTWVudTogW1xyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdMaXN0IGJhbm5lcnMnLCB1cmw6ICcvYWRtaW4vYmFubmVycyd9LFxyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdBZGQgYmFubmVyJywgdXJsOiAnL2FkbWluL2Jhbm5lcnMvYWRkJ31cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnQ2F0ZWdvcmllcycsXHJcblx0XHRcdFx0XHRzdWJNZW51OiBbXHJcblx0XHRcdFx0XHRcdHt0aXRsZTogJ0xpc3QgY2F0ZWdvcmllcycsIHVybDogJy9hZG1pbi9jYXRlZ29yaWVzJ30sXHJcblx0XHRcdFx0XHRcdHt0aXRsZTogJ0FkZCBjYXRlZ29yeScsIHVybDogJy9hZG1pbi9jYXRlZ29yaWVzL2FkZCd9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ1N1YmNhdGVnb3JpZXMnLFxyXG5cdFx0XHRcdFx0c3ViTWVudTogW1xyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdMaXN0IHN1YmNhdGVnb3JpZXMnLCB1cmw6ICcvYWRtaW4vc3ViY2F0ZWdvcmllcyd9LFxyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdBZGQgc3ViY2F0ZWdvcnknLCB1cmw6ICcvYWRtaW4vc3ViY2F0ZWdvcmllcy9hZGQnfVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdQcm9kdWN0cycsXHJcblx0XHRcdFx0XHRzdWJNZW51OiBbXHJcblx0XHRcdFx0XHRcdHt0aXRsZTogJ0xpc3QgcHJvZHVjdHMnLCB1cmw6ICcvYWRtaW4vcHJvZHVjdHMnfSxcclxuXHRcdFx0XHRcdFx0e3RpdGxlOiAnQWRkIHByb2R1Y3QnLCB1cmw6ICcvYWRtaW4vcHJvZHVjdHMvYWRkJ31cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnQXR0cmlidXRlcycsXHJcblx0XHRcdFx0XHRzdWJNZW51OiBbXHJcblx0XHRcdFx0XHRcdHt0aXRsZTogJ0xpc3QgYXR0cmlidXRlcycsIHVybDogJy9hZG1pbi9hdHRyaWJ1dGVzJ30sXHJcblx0XHRcdFx0XHRcdHt0aXRsZTogJ0FkZCBhdHRyaWJ1dGUnLCB1cmw6ICcvYWRtaW4vYXR0cmlidXRlcy9hZGQnfVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdVc2VycycsXHJcblx0XHRcdFx0XHRzdWJNZW51OiBbXHJcblx0XHRcdFx0XHRcdHt0aXRsZTogJ0xpc3QgdXNlcnMnLCB1cmw6ICcvYWRtaW4vdXNlcnMnfSxcclxuXHRcdFx0XHRcdFx0e3RpdGxlOiAnQWRkIHVzZXInLCB1cmw6ICcvYWRtaW4vdXNlcnMvYWRkJ31cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnUm9sZXMnLFxyXG5cdFx0XHRcdFx0c3ViTWVudTogW1xyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdMaXN0IHJvbGVzJywgdXJsOiAnL2FkbWluL3JvbGVzJ30sXHJcblx0XHRcdFx0XHRcdHt0aXRsZTogJ0FkZCByb2xlJywgdXJsOiAnL2FkbWluL3JvbGVzL2FkZCd9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ1ByaXZpbGVnZXMnLFxyXG5cdFx0XHRcdFx0c3ViTWVudTogW1xyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdMaXN0IHByaXZpbGVnZXMnLCB1cmw6ICcvYWRtaW4vcHJpdmlsZWdlcyd9LFxyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdBZGQgcHJpdmlsZWdlJywgdXJsOiAnL2FkbWluL3ByaXZpbGVnZXMvYWRkJ31cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF07XHJcblx0XHR9O1xyXG5cclxuXHRcdCRzY29wZS5nZXRDYXRlZ29yaWVzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdNZW4nLFxyXG5cdFx0XHRcdFx0Y29udGVudDogW1xyXG5cdFx0XHRcdFx0XHQnQ3V0ZSBLaXR0ZW5zJywgJ1N0cmFuZ2UgU3R1ZmYnLCAnQXV0b21hdGljIEZhaWxzJ1xyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdXb21lbicsXHJcblx0XHRcdFx0XHRjb250ZW50OiBbXHJcblx0XHRcdFx0XHRcdCdDdXRlIEtpdHRlbnMnLCAnU3RyYW5nZSBTdHVmZicsICdBdXRvbWF0aWMgRmFpbHMnXHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ0tpZHMnLFxyXG5cdFx0XHRcdFx0Y29udGVudDogW1xyXG5cdFx0XHRcdFx0XHQnQ3V0ZSBLaXR0ZW5zJywgJ1N0cmFuZ2UgU3R1ZmYnLCAnQXV0b21hdGljIEZhaWxzJ1xyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdBY2Nlc29yaWVzJyxcclxuXHRcdFx0XHRcdGNvbnRlbnQ6IFtcclxuXHRcdFx0XHRcdFx0J0N1dGUgS2l0dGVucycsICdTdHJhbmdlIFN0dWZmJywgJ0F1dG9tYXRpYyBGYWlscydcclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnU2hvZXMnXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcblx0XHRcdCRzY29wZS5jdXJyZW50VXJsID0gdG9TdGF0ZS51cmw7XHJcblx0ICAgIH0pO1xyXG5cdH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgndXNlcnMnKVxyXG5cdC5jb250cm9sbGVyKCdVc2VyQ3RybCcsIFsnJHNjb3BlJywgJyRsb2NhdGlvbicsICdBdXRoZW50aWNhdGlvbicsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uLCBBdXRoZW50aWNhdGlvbikge1xyXG5cclxuXHRcdC8vIElmIHVzZXIgaXMgc2lnbmVkIGluIHRoZW4gcmVkaXJlY3QgYmFjayBob21lXHJcblx0XHRpZiggQXV0aGVudGljYXRpb24uaXNMb2dnZWRJbigpICkgJGxvY2F0aW9uLnBhdGgoJy9hZG1pbi9kYXNoYm9hcmQnKTtcclxuXHJcblx0XHQkc2NvcGUubG9naW4gPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0QXV0aGVudGljYXRpb24ubG9naW4oJHNjb3BlLnVzZXIpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0QXV0aGVudGljYXRpb24ucmVnaXN0ZXIoJHNjb3BlLnVzZXIpO1xyXG5cdFx0fTtcclxuXHR9XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2NvcmUnKVxyXG5cdC5maWx0ZXIoJ3NsdWcnLCBbJyRmaWx0ZXInLCBmdW5jdGlvbigkZmlsdGVyKSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24od29yZCwgcmVwbGFjZW1lbnQgKSB7XHJcblx0ICAgICAgICBpZiAoIWFuZ3VsYXIuaXNTdHJpbmcod29yZCkpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gd29yZDtcclxuXHQgICAgICAgIH1cclxuXHQgICAgICAgIHJldHVybiAkZmlsdGVyKCdsb3dlcmNhc2UnKSh3b3JkLnJlcGxhY2UoL1xccysvZywgcmVwbGFjZW1lbnQpKTtcclxuXHQgICAgfTtcclxuXHR9XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3Nob3BwaW5nLWNhcnQnKVxyXG4gICAgLmZhY3RvcnkoJ2FsZXJ0c01hbmFnZXInLCBbJyRyb290U2NvcGUnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkdGltZW91dCkge1xyXG4gICAgICAgIHZhciBtZXNzYWdlVGltZXIgPSBmYWxzZSxcclxuICAgICAgICAgICAgZGlzcGxheUR1cmF0aW9uID0gODAwMDtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5hbGVydE1lc3NhZ2UgPSB7fTtcclxuICAgICAgICAkcm9vdFNjb3BlLnNob3dBbGVydCA9IGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhZGRBbGVydDogZnVuY3Rpb24obWVzc2FnZSwgdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VUaW1lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0LmNhbmNlbChtZXNzYWdlVGltZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuc2hvd0FsZXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWxlcnRNZXNzYWdlID0ge3R5cGU6IHR5cGUsIG1lc3NhZ2U6IG1lc3NhZ2V9O1xyXG5cclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VUaW1lciA9ICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFsZXJ0TWVzc2FnZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc2hvd0FsZXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LCBkaXNwbGF5RHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbG9zZUFsZXJ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYWxlcnRNZXNzYWdlID0ge307XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnNob3dBbGVydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKG1lc3NhZ2VUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdzaG9wcGluZy1jYXJ0JylcclxuXHQuZmFjdG9yeSgnQXV0aGVudGljYXRpb24nLCBbJyRodHRwJywgJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJyRjb29raWVzJywgJyRsb2cnLCAnYWxlcnRzTWFuYWdlcicsICdBUFBDT05TVEFOVFMnLCBmdW5jdGlvbigkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2F0aW9uLCAkY29va2llcywgJGxvZywgYWxlcnRzTWFuYWdlciwgQVBQQ09OU1RBTlRTKSB7XHJcblxyXG5cdFx0dmFyIGF1dGhPYmplY3QgPSAge1xyXG5cdFx0XHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkcm9vdFNjb3BlLmF1dGhVc2VyID0gJGNvb2tpZXMuZ2V0KCdhdXRoVXNlcicpO1xyXG5cdFx0XHRcdCRyb290U2NvcGUuYXV0aFRva2VuID0gJGNvb2tpZXMuZ2V0KCdhdXRoVG9rZW4nKTtcclxuXHJcblx0XHRcdFx0JHJvb3RTY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7IFxyXG5cdFx0XHRcdFx0cmV0dXJuICRjb29raWVzLmdldCgnYXV0aFVzZXInKTtcclxuXHRcdFx0XHR9LCBmdW5jdGlvbihhdXRoVXNlcikge1xyXG5cdFx0XHRcdCAgICAkcm9vdFNjb3BlLmF1dGhVc2VyID0gYXV0aFVzZXI7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdCRyb290U2NvcGUuJHdhdGNoKGZ1bmN0aW9uKCkgeyBcclxuXHRcdFx0XHRcdHJldHVybiAkY29va2llcy5nZXQoJ2F1dGhUb2tlbicpOyBcclxuXHRcdFx0XHR9LCBmdW5jdGlvbihhdXRoVG9rZW4pIHtcclxuXHRcdFx0XHQgICAgJHJvb3RTY29wZS5hdXRoVG9rZW4gPSBhdXRoVG9rZW47XHJcblx0ICAgIFx0XHRcdCRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUNTUkYtVG9rZW4nXSA9IGF1dGhUb2tlbjtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0bG9naW46IGZ1bmN0aW9uKHVzZXIpIHtcclxuXHRcdFx0XHQkaHR0cC5wb3N0KEFQUENPTlNUQU5UUy5VUkwrQVBQQ09OU1RBTlRTLkFQSSsnL3VzZXJzL2xvZ2luJywgdXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0aWYocmVzcG9uc2UuZGF0YS5lcnJvcikge1xyXG5cdFx0XHRcdFx0XHRhbGVydHNNYW5hZ2VyLmFkZEFsZXJ0KHJlc3BvbnNlLmRhdGEuZXJyb3IsICdhbGVydC1kYW5nZXInKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0QXV0aERldGFpbHMocmVzcG9uc2UuZGF0YSk7XHJcblx0XHRcdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvYWRtaW4vZGFzaGJvYXJkJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fS5iaW5kKHRoaXMpLCBmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdFx0JGxvZy5sb2coZXJyb3IpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRsb2dvdXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCRodHRwLmdldChBUFBDT05TVEFOVFMuVVJMK0FQUENPTlNUQU5UUy5BUEkrJy91c2Vycy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdCAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5lcnJvcikge1xyXG5cdFx0XHRcdFx0XHRhbGVydHNNYW5hZ2VyLmFkZEFsZXJ0KHJlc3BvbnNlLmRhdGEuZXJyb3IsICdhbGVydC1kYW5nZXInKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZGVsZXRlQXV0aERldGFpbHMoKTtcclxuXHRcdFx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJy9hZG1pbi91c2Vycy9sb2dpbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHQgICAgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHQgICAgXHQkbG9nLmxvZyhlcnJvcik7XHJcblx0XHRcdCAgICB9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNMb2dnZWRJbjogZnVuY3Rpb24oKSB7XHJcblx0XHQgICAgXHRyZXR1cm4gQm9vbGVhbigkY29va2llcy5nZXQoJ2F1dGhUb2tlbicpKTtcclxuXHRcdCAgICB9LFxyXG5cdFx0XHRjaGVja0F1dGg6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0JGh0dHAuZ2V0KEFQUENPTlNUQU5UUy5VUkwrQVBQQ09OU1RBTlRTLkFQSSsnL3VzZXJzL2xvZ2luJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0aWYocmVzcG9uc2UuZGF0YS5lcnJvcikge1xyXG5cdFx0XHRcdFx0XHRpZignZXJyb3InIGluIGNhbGxiYWNrKSBjYWxsYmFjay5lcnJvcihyZXNwb25zZS5kYXRhKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0QXV0aERldGFpbHMocmVzcG9uc2UuZGF0YSk7XHJcblx0XHRcdFx0XHRcdGlmKCdzdWNjZXNzJyBpbiBjYWxsYmFjaykgY2FsbGJhY2suc3VjY2VzcyhyZXNwb25zZS5kYXRhKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0ICAgIH0uYmluZCh0aGlzKSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0ICAgIFx0JGxvZy5sb2coZXJyb3IpO1xyXG5cdFx0XHQgICAgXHRpZignZXJyb3InIGluIGNhbGxiYWNrKSBjYWxsYmFjay5lcnJvcihyZXNwb25zZS5kYXRhKTtcclxuXHRcdFx0ICAgIH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRyZWdpc3RlcjogZnVuY3Rpb24odXNlcikge1xyXG5cdFx0XHRcdCRodHRwLnBvc3QoQVBQQ09OU1RBTlRTLlVSTCtBUFBDT05TVEFOVFMuQVBJKycvdXNlcnMvcmVnaXN0ZXInLCB1c2VyKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRpZihyZXNwb25zZS5kYXRhLmVycm9yKSB7XHJcblx0XHRcdFx0XHRcdGFsZXJ0c01hbmFnZXIuYWRkQWxlcnQocmVzcG9uc2UuZGF0YS5lcnJvciwgJ2FsZXJ0LWRhbmdlcicpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRBdXRoRGV0YWlscyhyZXNwb25zZS5kYXRhKTtcclxuXHRcdFx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJy9hZG1pbi9kYXNoYm9hcmQnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LmJpbmQodGhpcyksIGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdFx0XHQkbG9nLmxvZyhlcnJvcik7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldEF1dGhEZXRhaWxzOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0JGNvb2tpZXMucHV0T2JqZWN0KCdhdXRoVXNlcicsIGRhdGEudXNlcik7XHJcblx0XHRcdFx0JGNvb2tpZXMucHV0KCdhdXRoVG9rZW4nLCBkYXRhLnRva2VuKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZGVsZXRlQXV0aERldGFpbHM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCRjb29raWVzLnJlbW92ZSgnYXV0aFVzZXInKTtcclxuXHRcdFx0XHQkY29va2llcy5yZW1vdmUoJ2F1dGhUb2tlbicpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRnZXRBdXRoVXNlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuICRjb29raWVzLmdldCgnYXV0aFVzZXInKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhdXRoT2JqZWN0O1xyXG5cdH1dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnc2hvcHBpbmctY2FydCcpXHJcbiAgICAuZmFjdG9yeSgnYXV0aEh0dHBSZXNwb25zZUludGVyY2VwdG9yJywgWyckcScsICckbG9jYXRpb24nLCAnJGNvb2tpZXMnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbigkcSwgJGxvY2F0aW9uLCAkY29va2llcywgJHRpbWVvdXQpIHtcclxuICAgIFx0cmV0dXJuIHtcclxuICAgICAgICAgICAgLypyZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbmZpZy5tZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLmhlYWRlcnNbJ1gtQ1NSRi1Ub2tlbiddID0gJGNvb2tpZXMuZ2V0KCdhdXRoVG9rZW4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgICAgIH0sKi9cclxuICAgICAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2UgNDAzXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlIHx8ICRxLndoZW4ocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbihyZWplY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWplY3Rpb24uc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9hZG1pbi91c2Vycy9sb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
