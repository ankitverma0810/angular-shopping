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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImFwcC5qcyIsImJhbm5lcnMuanMiLCJjb3JlLmpzIiwiZGFzaGJvYXJkLmpzIiwicGFnZXMuanMiLCJwcm9kdWN0cy5qcyIsInVzZXJzLmpzIiwiY29udHJvbGxlcnMvYWxlcnQuanMiLCJjb250cm9sbGVycy9iYW5uZXIuanMiLCJjb250cm9sbGVycy9kYXNoYm9hcmQuanMiLCJjb250cm9sbGVycy9mb290ZXIuanMiLCJjb250cm9sbGVycy9oZWFkZXIuanMiLCJjb250cm9sbGVycy9wYWdlLmpzIiwiY29udHJvbGxlcnMvcHJvZHVjdC5qcyIsImNvbnRyb2xsZXJzL3NpZGViYXIuanMiLCJjb250cm9sbGVycy91c2VyLmpzIiwiZmlsdGVycy9jb3JlLmpzIiwic2VydmljZXMvYWxlcnRzTWFuYWdlci5qcyIsInNlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLmpzIiwic2VydmljZXMvaW50ZXJjZXB0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBJbml0IHRoZSBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uIG1vZHVsZSBmb3IgQW5ndWxhckpTIGFwcGxpY2F0aW9uXHJcbnZhciBBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24gPSAoZnVuY3Rpb24oKSB7XHJcblx0Ly8gSW5pdCBtb2R1bGUgY29uZmlndXJhdGlvbiBvcHRpb25zXHJcblx0dmFyIGFwcGxpY2F0aW9uTW9kdWxlTmFtZSA9ICdzaG9wcGluZy1jYXJ0JztcclxuXHR2YXIgYXBwbGljYXRpb25Nb2R1bGVWZW5kb3JEZXBlbmRlbmNpZXMgPSBbJ25nQ29va2llcycsICAnbmdBbmltYXRlJywgJ25nU2FuaXRpemUnLCAgJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnXTtcclxuXHR2YXIgYXBwbGljYXRpb25Db25zdGFudHMgPSB7XHJcblx0XHRTSVRFTkFNRTogJ1Nob3BwaW5nIENhcnQnLFxyXG4gICAgICAgIFJPT1Q6ICcvJyxcclxuICAgICAgICBVUkw6ICdodHRwOi8vbG9jYWxob3N0L2FuZ3VsYXItc2hvcHBpbmctYmFja2VuZCcsXHJcbiAgICAgICAgQVBJOiAnL2FkbWluJ1xyXG5cdH07XHJcblxyXG5cdC8vIEFkZCBhIG5ldyB2ZXJ0aWNhbCBtb2R1bGVcclxuXHR2YXIgcmVnaXN0ZXJNb2R1bGUgPSBmdW5jdGlvbihtb2R1bGVOYW1lLCBkZXBlbmRlbmNpZXMpIHtcclxuXHRcdC8vIENyZWF0ZSBhbmd1bGFyIG1vZHVsZVxyXG5cdFx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgZGVwZW5kZW5jaWVzIHx8IFtdKTtcclxuXHJcblx0XHQvLyBBZGQgdGhlIG1vZHVsZSB0byB0aGUgQW5ndWxhckpTIGNvbmZpZ3VyYXRpb24gZmlsZVxyXG5cdFx0YW5ndWxhci5tb2R1bGUoYXBwbGljYXRpb25Nb2R1bGVOYW1lKS5yZXF1aXJlcy5wdXNoKG1vZHVsZU5hbWUpO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRhcHBsaWNhdGlvbk1vZHVsZU5hbWU6IGFwcGxpY2F0aW9uTW9kdWxlTmFtZSxcclxuXHRcdGFwcGxpY2F0aW9uTW9kdWxlVmVuZG9yRGVwZW5kZW5jaWVzOiBhcHBsaWNhdGlvbk1vZHVsZVZlbmRvckRlcGVuZGVuY2llcyxcclxuXHRcdHJlZ2lzdGVyTW9kdWxlOiByZWdpc3Rlck1vZHVsZSxcclxuXHRcdGFwcGxpY2F0aW9uQ29uc3RhbnRzOiBhcHBsaWNhdGlvbkNvbnN0YW50c1xyXG5cdH07XHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy9TdGFydCBieSBkZWZpbmluZyB0aGUgbWFpbiBtb2R1bGUgYW5kIGFkZGluZyB0aGUgbW9kdWxlIGRlcGVuZGVuY2llc1xyXG5hbmd1bGFyLm1vZHVsZShBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Nb2R1bGVOYW1lLCBBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Nb2R1bGVWZW5kb3JEZXBlbmRlbmNpZXMpXHJcblx0ICAgLmNvbnN0YW50KCdBUFBDT05TVEFOVFMnLCBBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Db25zdGFudHMpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoQXBwbGljYXRpb25Db25maWd1cmF0aW9uLmFwcGxpY2F0aW9uTW9kdWxlTmFtZSkuY29uZmlnKFsnJGxvY2F0aW9uUHJvdmlkZXInLCAnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKSB7XHJcblxyXG5cdFx0Ly9TZXR0aW5nIEhUTUw1IExvY2F0aW9uIE1vZGVcclxuXHRcdC8vJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtlbmFibGVkOiB0cnVlfSk7XHJcblxyXG5cdFx0Ly9IdHRwIEludGVyY3BldG9yIHRvIGNoZWNrIGF1dGggZmFpbHVyZXMgZm9yIHhociByZXF1ZXN0c1xyXG5cdFx0Ly9uZWVkIHRvIGNoZWNrIHdoZXRoZXIgaXRzIHdvcmtpbmcgb3Igbm90XHJcblx0XHQkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdhdXRoSHR0cFJlc3BvbnNlSW50ZXJjZXB0b3InKTtcclxuXHR9XHJcbl0pO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoQXBwbGljYXRpb25Db25maWd1cmF0aW9uLmFwcGxpY2F0aW9uTW9kdWxlTmFtZSkucnVuKFsnQXV0aGVudGljYXRpb24nLCBmdW5jdGlvbihBdXRoZW50aWNhdGlvbikge1xyXG4gICAgQXV0aGVudGljYXRpb24uaW5pdCgpO1xyXG59XSk7XHJcblxyXG4vL1RoZW4gZGVmaW5lIHRoZSBpbml0IGZ1bmN0aW9uIGZvciBzdGFydGluZyB1cCB0aGUgYXBwbGljYXRpb25cclxuYW5ndWxhci5lbGVtZW50KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHQvL1RoZW4gaW5pdCB0aGUgYXBwXHJcblx0YW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFtBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Nb2R1bGVOYW1lXSk7XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFVzZSBBcHBsaWNhaW9uIGNvbmZpZ3VyYXRpb24gbW9kdWxlIHRvIHJlZ2lzdGVyIGEgbmV3IG1vZHVsZVxyXG5BcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24ucmVnaXN0ZXJNb2R1bGUoJ2Jhbm5lcnMnKTtcclxuXHJcbi8vIFNldHRpbmcgdXAgcm91dGVcclxuYW5ndWxhci5tb2R1bGUoJ2Jhbm5lcnMnKS5jb25maWcoWyckc3RhdGVQcm92aWRlcicsXHJcblx0ZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcclxuXHRcdC8vIEhvbWUgc3RhdGUgcm91dGluZ1xyXG5cdFx0JHN0YXRlUHJvdmlkZXIuXHJcblx0XHRzdGF0ZSgnL2FkbWluL2Jhbm5lcnMnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZG1pbi9iYW5uZXJzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9iYW5uZXJzL2FkbWluX2luZGV4Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQmFubmVyc0N0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdhZG1pbkxheW91dCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnL2FkbWluL2Jhbm5lcnMvYWRkJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vYmFubmVycy9hZGQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Jhbm5lcnMvYWRtaW5fYWRkLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQmFubmVyc0N0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdhZG1pbkxheW91dCdcclxuICAgICAgICB9KTtcclxuXHR9XHJcbl0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFVzZSBBcHBsaWNhaW9uIGNvbmZpZ3VyYXRpb24gbW9kdWxlIHRvIHJlZ2lzdGVyIGEgbmV3IG1vZHVsZVxyXG5BcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24ucmVnaXN0ZXJNb2R1bGUoJ2NvcmUnKTtcclxuXHJcbi8vIFNldHRpbmcgdXAgcm91dGVcclxuYW5ndWxhci5tb2R1bGUoJ2NvcmUnKS5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLFxyXG5cdGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuXHRcdC8vIFJlZGlyZWN0IHRvIGhvbWUgdmlldyB3aGVuIHJvdXRlIG5vdCBmb3VuZFxyXG5cdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG5cclxuXHRcdC8vIEhvbWUgc3RhdGUgcm91dGluZ1xyXG5cdFx0JHN0YXRlUHJvdmlkZXIuXHJcblx0XHRzdGF0ZSgnZGVmYXVsdExheW91dCcsIHtcclxuXHRcdFx0YWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAnbGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbGF5b3V0cy9kZWZhdWx0Lmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2hlYWRlckBkZWZhdWx0TGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZWxlbWVudHMvaGVhZGVyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIZWFkZXJDdHJsJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdmb290ZXJAZGVmYXVsdExheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2VsZW1lbnRzL2Zvb3Rlci5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRm9vdGVyQ3RybCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnYWxlcnRAZGVmYXVsdExheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2xheW91dHMvYWxlcnQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0FsZXJ0Q3RybCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cdFx0fSlcclxuICAgICAgICAuc3RhdGUoJ2FkbWluTGF5b3V0Jywge1xyXG4gICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICdsYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9sYXlvdXRzL2FkbWluLmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2hlYWRlckBhZG1pbkxheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2VsZW1lbnRzL2FkbWluL2hlYWRlci5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSGVhZGVyQ3RybCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnZm9vdGVyQGFkbWluTGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZWxlbWVudHMvYWRtaW4vZm9vdGVyLmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ3NpZGViYXJAYWRtaW5MYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9lbGVtZW50cy9hZG1pbi9zaWRlYmFyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdTaWRlYmFyQ3RybCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnYWxlcnRAYWRtaW5MYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9sYXlvdXRzL2FsZXJ0Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBbGVydEN0cmwnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbG9naW5MYXlvdXQnLCB7XHJcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgJ2xheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2xheW91dHMvbG9naW4uaHRtbCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnYWxlcnRAbG9naW5MYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9sYXlvdXRzL2FsZXJ0Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBbGVydEN0cmwnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHR9XHJcbl0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFVzZSBBcHBsaWNhaW9uIGNvbmZpZ3VyYXRpb24gbW9kdWxlIHRvIHJlZ2lzdGVyIGEgbmV3IG1vZHVsZVxyXG5BcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24ucmVnaXN0ZXJNb2R1bGUoJ2Rhc2hib2FyZCcpO1xyXG5cclxuLy8gU2V0dGluZyB1cCByb3V0ZVxyXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJykuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLFxyXG5cdGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblx0XHQvLyBIb21lIHN0YXRlIHJvdXRpbmdcclxuXHRcdCRzdGF0ZVByb3ZpZGVyLlxyXG5cdFx0c3RhdGUoJy9hZG1pbi9kYXNoYm9hcmQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZG1pbi9kYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9hZG1pbl9pbmRleC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0Rhc2hib2FyZEN0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdhZG1pbkxheW91dCdcclxuICAgICAgICB9KTtcclxuXHR9XHJcbl0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFVzZSBBcHBsaWNhaW9uIGNvbmZpZ3VyYXRpb24gbW9kdWxlIHRvIHJlZ2lzdGVyIGEgbmV3IG1vZHVsZVxyXG5BcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24ucmVnaXN0ZXJNb2R1bGUoJ3BhZ2VzJyk7XHJcblxyXG4vLyBTZXR0aW5nIHVwIHJvdXRlXHJcbmFuZ3VsYXIubW9kdWxlKCdwYWdlcycpLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJyxcclxuXHRmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xyXG5cdFx0Ly8gSG9tZSBzdGF0ZSByb3V0aW5nXHJcblx0XHQkc3RhdGVQcm92aWRlci5cclxuXHRcdHN0YXRlKCdob21lJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9wYWdlcy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUGFnZXNDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGVmYXVsdExheW91dCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnY2hlY2tvdXQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9wYWdlcy9jaGVja291dCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcGFnZXMvY2hlY2tvdXQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlc0N0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkZWZhdWx0TGF5b3V0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCcvYWRtaW4vcGFnZXMnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZG1pbi9wYWdlcycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcGFnZXMvYWRtaW5faW5kZXguaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlc0N0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdhZG1pbkxheW91dCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnL2FkbWluL3BhZ2VzL2FkZCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkbWluL3BhZ2VzL2FkZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcGFnZXMvYWRtaW5fYWRkLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUGFnZXNDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnYWRtaW5MYXlvdXQnXHJcbiAgICAgICAgfSk7XHJcblx0fVxyXG5dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBVc2UgQXBwbGljYWlvbiBjb25maWd1cmF0aW9uIG1vZHVsZSB0byByZWdpc3RlciBhIG5ldyBtb2R1bGVcclxuQXBwbGljYXRpb25Db25maWd1cmF0aW9uLnJlZ2lzdGVyTW9kdWxlKCdwcm9kdWN0cycpO1xyXG5cclxuLy8gU2V0dGluZyB1cCByb3V0ZVxyXG5hbmd1bGFyLm1vZHVsZSgncHJvZHVjdHMnKS5jb25maWcoWyckc3RhdGVQcm92aWRlcicsXHJcblx0ZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcclxuXHRcdC8vIHVzZXIgc3RhdGUgcm91dGluZ1xyXG5cdFx0JHN0YXRlUHJvdmlkZXIuXHJcblx0XHRzdGF0ZSgncHJvZHVjdHMnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9wcm9kdWN0cycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcHJvZHVjdHMvaW5kZXguaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9kdWN0Q3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2RlZmF1bHRMYXlvdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJy9hZG1pbi9wcm9kdWN0cycsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkbWluL3Byb2R1Y3RzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9wcm9kdWN0cy9hZG1pbl9pbmRleC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1Byb2R1Y3RDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnYWRtaW5MYXlvdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJy9hZG1pbi9wcm9kdWN0cy9hZGQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZG1pbi9wcm9kdWN0cy9hZGQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3Byb2R1Y3RzL2FkbWluX2FkZC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1Byb2R1Y3RDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnYWRtaW5MYXlvdXQnXHJcbiAgICAgICAgfSk7XHJcblx0fVxyXG5dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBVc2UgQXBwbGljYWlvbiBjb25maWd1cmF0aW9uIG1vZHVsZSB0byByZWdpc3RlciBhIG5ldyBtb2R1bGVcclxuQXBwbGljYXRpb25Db25maWd1cmF0aW9uLnJlZ2lzdGVyTW9kdWxlKCd1c2VycycpO1xyXG5cclxuLy8gU2V0dGluZyB1cCByb3V0ZVxyXG5hbmd1bGFyLm1vZHVsZSgndXNlcnMnKS5jb25maWcoWyckc3RhdGVQcm92aWRlcicsXHJcblx0ZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcclxuXHRcdC8vIHVzZXIgc3RhdGUgcm91dGluZ1xyXG5cdFx0JHN0YXRlUHJvdmlkZXIuXHJcblx0XHRzdGF0ZSgnbG9naW4nLCB7XHJcbiAgICAgICAgICAgIHVybDogJy91c2Vycy9sb2dpbicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvdXNlcnMvbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyQ3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2RlZmF1bHRMYXlvdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3JlZ2lzdGVyJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvdXNlcnMvcmVnaXN0ZXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3VzZXJzL3JlZ2lzdGVyLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnVXNlckN0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkZWZhdWx0TGF5b3V0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhZG1pbi9sb2dpbicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkbWluL3VzZXJzL2xvZ2luJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy91c2Vycy9hZG1pbl9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1VzZXJDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnbG9naW5MYXlvdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2FkbWluL3JlZ2lzdGVyJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vdXNlcnMvcmVnaXN0ZXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3VzZXJzL2FkbWluX3JlZ2lzdGVyLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnVXNlckN0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdsb2dpbkxheW91dCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWRtaW4vZm9yZ290cGFzc3dvcmQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZG1pbi91c2Vycy9mb3Jnb3QtcGFzc3dvcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3VzZXJzL2FkbWluX2ZvcmdvdF9wYXNzd29yZC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1VzZXJDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnbG9naW5MYXlvdXQnXHJcbiAgICAgICAgfSk7XHJcblx0fVxyXG5dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnY29yZScpXHJcblx0LmNvbnRyb2xsZXIoJ0FsZXJ0Q3RybCcsIFsnJHNjb3BlJywgJ2FsZXJ0c01hbmFnZXInLCBmdW5jdGlvbigkc2NvcGUsIGFsZXJ0c01hbmFnZXIpIHtcclxuXHQkc2NvcGUuY2xvc2VBbGVydCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgYWxlcnRzTWFuYWdlci5jbG9zZUFsZXJ0KGluZGV4KTtcclxuICAgIH07XHRcclxufV0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYmFubmVycycpXHJcblx0LmNvbnRyb2xsZXIoJ0Jhbm5lcnNDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxufV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxyXG5cdC5jb250cm9sbGVyKCdEYXNoYm9hcmRDdHJsJywgWyckc2NvcGUnLCAnJGxvY2F0aW9uJywgJyRsb2cnLCAnJGh0dHAnLCAnQXV0aGVudGljYXRpb24nLCAnQVBQQ09OU1RBTlRTJywgJ2FsZXJ0c01hbmFnZXInLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbiwgJGxvZywgJGh0dHAsIEF1dGhlbnRpY2F0aW9uLCBBUFBDT05TVEFOVFMsIGFsZXJ0c01hbmFnZXIpIHtcclxuXHJcblx0XHQvLyBJZiB1c2VyIGlzIG5vdCBzaWduZWQgaW4gdGhlbiByZWRpcmVjdCBiYWNrIGhvbWVcclxuXHRcdGlmKCAhQXV0aGVudGljYXRpb24uaXNMb2dnZWRJbigpICkgJGxvY2F0aW9uLnBhdGgoJy9hZG1pbi91c2Vycy9sb2dpbicpO1xyXG5cclxuXHRcdCRzY29wZS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRodHRwLmdldChBUFBDT05TVEFOVFMuVVJMK0FQUENPTlNUQU5UUy5BUEkrJy9kZXRhaWxzL3ZpZXcvMScpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHQgICAgICAgICAgICAkc2NvcGUuZGV0YWlscyA9IHJlc3BvbnNlLmRhdGEuRGV0YWlsO1xyXG5cdCAgICAgICAgfSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdCRzY29wZS5hZGQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0JGh0dHAucG9zdChBUFBDT05TVEFOVFMuVVJMK0FQUENPTlNUQU5UUy5BUEkrJy9kZXRhaWxzL2VkaXQvJyskc2NvcGUuZGV0YWlscy5pZCwgJHNjb3BlLmRldGFpbHMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRpZihyZXNwb25zZS5kYXRhLmVycm9yKSB7XHJcblx0XHRcdFx0XHRhbGVydHNNYW5hZ2VyLmFkZEFsZXJ0KHJlc3BvbnNlLmRhdGEuZXJyb3IsICdhbGVydC1kYW5nZXInKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YWxlcnRzTWFuYWdlci5hZGRBbGVydChyZXNwb25zZS5kYXRhLnN1Y2Nlc3MsICdhbGVydC1zdWNjZXNzJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCBmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdCRsb2cubG9nKGVycm9yKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cdH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnY29yZScpXHJcblx0LmNvbnRyb2xsZXIoJ0Zvb3RlckN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1x0XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnY29yZScpXHJcblx0LmNvbnRyb2xsZXIoJ0hlYWRlckN0cmwnLCBbJyRzY29wZScsICdBdXRoZW50aWNhdGlvbicsIGZ1bmN0aW9uKCRzY29wZSwgQXV0aGVudGljYXRpb24pIHtcclxuXHJcblx0XHQkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdEF1dGhlbnRpY2F0aW9uLmxvZ291dCgpO1xyXG5cdFx0fTtcclxufV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwYWdlcycpXHJcblx0LmNvbnRyb2xsZXIoJ1BhZ2VzQ3RybCcsIFsnJHNjb3BlJywgJyRsb2cnLCAnJGZpbHRlcicsICckaHR0cCcsICckbG9jYXRpb24nLCAnQVBQQ09OU1RBTlRTJywgJ2FsZXJ0c01hbmFnZXInLCBmdW5jdGlvbigkc2NvcGUsICRsb2csICRmaWx0ZXIsICRodHRwLCAkbG9jYXRpb24sIEFQUENPTlNUQU5UUywgYWxlcnRzTWFuYWdlcikge1xyXG5cclxuXHRcdCRzY29wZS5pbmRleCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkaHR0cC5nZXQoQVBQQ09OU1RBTlRTLlVSTCtBUFBDT05TVEFOVFMuQVBJKycvcGFnZXMnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0ICAgICAgICAgICAgJHNjb3BlLnBhZ2VzID0gcmVzcG9uc2UuZGF0YTtcclxuXHQgICAgICAgICAgICAkbG9nLmxvZyhyZXNwb25zZS5kYXRhKTtcclxuXHQgICAgICAgIH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuYWRkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRzY29wZS5wYWdlLnNsdWcgPSAkZmlsdGVyKCdzbHVnJykoJHNjb3BlLnBhZ2UudGl0bGUsICctJyk7XHJcblx0XHRcdCRzY29wZS5wYWdlLnN0YXR1c19pZCA9IDE7XHJcblxyXG5cdFx0XHQkaHR0cC5wb3N0KEFQUENPTlNUQU5UUy5VUkwrQVBQQ09OU1RBTlRTLkFQSSsnL3BhZ2VzL2FkZCcsICRzY29wZS5wYWdlKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0aWYocmVzcG9uc2UuZGF0YS5lcnJvcikge1xyXG5cdFx0XHRcdFx0YWxlcnRzTWFuYWdlci5hZGRBbGVydChyZXNwb25zZS5kYXRhLmVycm9yLCAnYWxlcnQtZGFuZ2VyJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGFsZXJ0c01hbmFnZXIuYWRkQWxlcnQocmVzcG9uc2UuZGF0YS5zdWNjZXNzLCAnYWxlcnQtc3VjY2VzcycpO1xyXG5cdFx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJy9hZG1pbi9wYWdlcycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHQkbG9nLmxvZyhlcnJvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdwcm9kdWN0cycpXHJcblx0LmNvbnRyb2xsZXIoJ1Byb2R1Y3RDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdjb3JlJylcclxuXHQuY29udHJvbGxlcignU2lkZWJhckN0cmwnLCBbJyRzY29wZScsICckbG9jYXRpb24nLCAnJHN0YXRlJywgJyR0aW1lb3V0JywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sICRzdGF0ZSwgJHRpbWVvdXQpIHtcclxuXHJcblx0XHQkc2NvcGUuY3VycmVudFVybCA9ICRzdGF0ZS5jdXJyZW50LnVybDtcclxuXHJcblx0XHQkc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkc2NvcGUuZ3JvdXBzID0gJHNjb3BlLmdldEdyb3VwcygpO1xyXG5cdFx0XHQkc2NvcGUuY2F0ZWdvcmllcyA9ICRzY29wZS5nZXRDYXRlZ29yaWVzKCk7XHJcblxyXG5cdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0ICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmdyb3VwcywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xyXG5cdFx0XHRcdFx0aWYoIHZhbHVlLnN1Yk1lbnUgIT09IHVuZGVmaW5lZCApIHtcclxuXHRcdFx0XHRcdFx0YW5ndWxhci5mb3JFYWNoKHZhbHVlLnN1Yk1lbnUsIGZ1bmN0aW9uKGlubmVyVmFsdWUsIGlubmVyS2V5KSB7XHJcblx0XHRcdFx0XHRcdFx0aWYoICRzdGF0ZS5jdXJyZW50LnVybCA9PT0gaW5uZXJWYWx1ZS51cmwgKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQkKCcjJyt2YWx1ZS50aXRsZSkuY29sbGFwc2UoJ3Nob3cnKTsgLy9mb3Igb3BlbmluZyBhY3RpdmUgdGFiXHJcblx0XHRcdFx0XHRcdFx0XHQkc2NvcGUuZ3JvdXBzW2tleV0uaXNPcGVuID0gdHJ1ZTsgLy9mb3Igc2hvd2luZyByaWdodC9kb3duIGdseXBoaWNvbiBpY29ucyBvbiBhY3RpdmUgdGFiXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdCAgICB9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0JHNjb3BlLmdldEdyb3VwcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnRGFzaGJvYXJkJyxcclxuXHRcdFx0XHRcdHVybDogJy9hZG1pbi9kYXNoYm9hcmQnXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ1BhZ2VzJyxcclxuXHRcdFx0XHRcdHN1Yk1lbnU6IFtcclxuXHRcdFx0XHRcdFx0e3RpdGxlOiAnTGlzdCBwYWdlcycsIHVybDogJy9hZG1pbi9wYWdlcyd9LFxyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdBZGQgcGFnZScsIHVybDogJy9hZG1pbi9wYWdlcy9hZGQnfVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdCYW5uZXJzJyxcclxuXHRcdFx0XHRcdHN1Yk1lbnU6IFtcclxuXHRcdFx0XHRcdFx0e3RpdGxlOiAnTGlzdCBiYW5uZXJzJywgdXJsOiAnL2FkbWluL2Jhbm5lcnMnfSxcclxuXHRcdFx0XHRcdFx0e3RpdGxlOiAnQWRkIGJhbm5lcicsIHVybDogJy9hZG1pbi9iYW5uZXJzL2FkZCd9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ0NhdGVnb3JpZXMnLFxyXG5cdFx0XHRcdFx0c3ViTWVudTogW1xyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdMaXN0IGNhdGVnb3JpZXMnLCB1cmw6ICcvYWRtaW4vY2F0ZWdvcmllcyd9LFxyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdBZGQgY2F0ZWdvcnknLCB1cmw6ICcvYWRtaW4vY2F0ZWdvcmllcy9hZGQnfVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdTdWJjYXRlZ29yaWVzJyxcclxuXHRcdFx0XHRcdHN1Yk1lbnU6IFtcclxuXHRcdFx0XHRcdFx0e3RpdGxlOiAnTGlzdCBzdWJjYXRlZ29yaWVzJywgdXJsOiAnL2FkbWluL3N1YmNhdGVnb3JpZXMnfSxcclxuXHRcdFx0XHRcdFx0e3RpdGxlOiAnQWRkIHN1YmNhdGVnb3J5JywgdXJsOiAnL2FkbWluL3N1YmNhdGVnb3JpZXMvYWRkJ31cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnUHJvZHVjdHMnLFxyXG5cdFx0XHRcdFx0c3ViTWVudTogW1xyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdMaXN0IHByb2R1Y3RzJywgdXJsOiAnL2FkbWluL3Byb2R1Y3RzJ30sXHJcblx0XHRcdFx0XHRcdHt0aXRsZTogJ0FkZCBwcm9kdWN0JywgdXJsOiAnL2FkbWluL3Byb2R1Y3RzL2FkZCd9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ0F0dHJpYnV0ZXMnLFxyXG5cdFx0XHRcdFx0c3ViTWVudTogW1xyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdMaXN0IGF0dHJpYnV0ZXMnLCB1cmw6ICcvYWRtaW4vYXR0cmlidXRlcyd9LFxyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdBZGQgYXR0cmlidXRlJywgdXJsOiAnL2FkbWluL2F0dHJpYnV0ZXMvYWRkJ31cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnVXNlcnMnLFxyXG5cdFx0XHRcdFx0c3ViTWVudTogW1xyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdMaXN0IHVzZXJzJywgdXJsOiAnL2FkbWluL3VzZXJzJ30sXHJcblx0XHRcdFx0XHRcdHt0aXRsZTogJ0FkZCB1c2VyJywgdXJsOiAnL2FkbWluL3VzZXJzL2FkZCd9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ1JvbGVzJyxcclxuXHRcdFx0XHRcdHN1Yk1lbnU6IFtcclxuXHRcdFx0XHRcdFx0e3RpdGxlOiAnTGlzdCByb2xlcycsIHVybDogJy9hZG1pbi9yb2xlcyd9LFxyXG5cdFx0XHRcdFx0XHR7dGl0bGU6ICdBZGQgcm9sZScsIHVybDogJy9hZG1pbi9yb2xlcy9hZGQnfVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdQcml2aWxlZ2VzJyxcclxuXHRcdFx0XHRcdHN1Yk1lbnU6IFtcclxuXHRcdFx0XHRcdFx0e3RpdGxlOiAnTGlzdCBwcml2aWxlZ2VzJywgdXJsOiAnL2FkbWluL3ByaXZpbGVnZXMnfSxcclxuXHRcdFx0XHRcdFx0e3RpdGxlOiAnQWRkIHByaXZpbGVnZScsIHVybDogJy9hZG1pbi9wcml2aWxlZ2VzL2FkZCd9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuZ2V0Q2F0ZWdvcmllcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnTWVuJyxcclxuXHRcdFx0XHRcdGNvbnRlbnQ6IFtcclxuXHRcdFx0XHRcdFx0J0N1dGUgS2l0dGVucycsICdTdHJhbmdlIFN0dWZmJywgJ0F1dG9tYXRpYyBGYWlscydcclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnV29tZW4nLFxyXG5cdFx0XHRcdFx0Y29udGVudDogW1xyXG5cdFx0XHRcdFx0XHQnQ3V0ZSBLaXR0ZW5zJywgJ1N0cmFuZ2UgU3R1ZmYnLCAnQXV0b21hdGljIEZhaWxzJ1xyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdLaWRzJyxcclxuXHRcdFx0XHRcdGNvbnRlbnQ6IFtcclxuXHRcdFx0XHRcdFx0J0N1dGUgS2l0dGVucycsICdTdHJhbmdlIFN0dWZmJywgJ0F1dG9tYXRpYyBGYWlscydcclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnQWNjZXNvcmllcycsXHJcblx0XHRcdFx0XHRjb250ZW50OiBbXHJcblx0XHRcdFx0XHRcdCdDdXRlIEtpdHRlbnMnLCAnU3RyYW5nZSBTdHVmZicsICdBdXRvbWF0aWMgRmFpbHMnXHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ1Nob2VzJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XTtcclxuXHRcdH07XHJcblxyXG5cdFx0JHNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xyXG5cdFx0XHQkc2NvcGUuY3VycmVudFVybCA9IHRvU3RhdGUudXJsO1xyXG5cdCAgICB9KTtcclxuXHR9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ3VzZXJzJylcclxuXHQuY29udHJvbGxlcignVXNlckN0cmwnLCBbJyRzY29wZScsICckbG9jYXRpb24nLCAnQXV0aGVudGljYXRpb24nLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbiwgQXV0aGVudGljYXRpb24pIHtcclxuXHJcblx0XHQvLyBJZiB1c2VyIGlzIHNpZ25lZCBpbiB0aGVuIHJlZGlyZWN0IGJhY2sgaG9tZVxyXG5cdFx0aWYoIEF1dGhlbnRpY2F0aW9uLmlzTG9nZ2VkSW4oKSApICRsb2NhdGlvbi5wYXRoKCcvYWRtaW4vZGFzaGJvYXJkJyk7XHJcblxyXG5cdFx0JHNjb3BlLmxvZ2luID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdEF1dGhlbnRpY2F0aW9uLmxvZ2luKCRzY29wZS51c2VyKTtcclxuXHRcdH07XHJcblxyXG5cdFx0JHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdEF1dGhlbnRpY2F0aW9uLnJlZ2lzdGVyKCRzY29wZS51c2VyKTtcclxuXHRcdH07XHJcblx0fV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdjb3JlJylcclxuXHQuZmlsdGVyKCdzbHVnJywgWyckZmlsdGVyJywgZnVuY3Rpb24oJGZpbHRlcikge1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHdvcmQsIHJlcGxhY2VtZW50ICkge1xyXG5cdCAgICAgICAgaWYgKCFhbmd1bGFyLmlzU3RyaW5nKHdvcmQpKSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHdvcmQ7XHJcblx0ICAgICAgICB9XHJcblx0ICAgICAgICByZXR1cm4gJGZpbHRlcignbG93ZXJjYXNlJykod29yZC5yZXBsYWNlKC9cXHMrL2csIHJlcGxhY2VtZW50KSk7XHJcblx0ICAgIH07XHJcblx0fV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdzaG9wcGluZy1jYXJ0JylcclxuICAgIC5mYWN0b3J5KCdhbGVydHNNYW5hZ2VyJywgWyckcm9vdFNjb3BlJywgJyR0aW1lb3V0JywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHRpbWVvdXQpIHtcclxuICAgICAgICB2YXIgbWVzc2FnZVRpbWVyID0gZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc3BsYXlEdXJhdGlvbiA9IDgwMDA7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuYWxlcnRNZXNzYWdlID0ge307XHJcbiAgICAgICAgJHJvb3RTY29wZS5zaG93QWxlcnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWRkQWxlcnQ6IGZ1bmN0aW9uKG1lc3NhZ2UsIHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlVGltZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dC5jYW5jZWwobWVzc2FnZVRpbWVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnNob3dBbGVydCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFsZXJ0TWVzc2FnZSA9IHt0eXBlOiB0eXBlLCBtZXNzYWdlOiBtZXNzYWdlfTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlVGltZXIgPSAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hbGVydE1lc3NhZ2UgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnNob3dBbGVydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSwgZGlzcGxheUR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xvc2VBbGVydDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmFsZXJ0TWVzc2FnZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zaG93QWxlcnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0LmNhbmNlbChtZXNzYWdlVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnc2hvcHBpbmctY2FydCcpXHJcblx0LmZhY3RvcnkoJ0F1dGhlbnRpY2F0aW9uJywgWyckaHR0cCcsICckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICckY29va2llcycsICckbG9nJywgJ2FsZXJ0c01hbmFnZXInLCAnQVBQQ09OU1RBTlRTJywgZnVuY3Rpb24oJGh0dHAsICRyb290U2NvcGUsICRsb2NhdGlvbiwgJGNvb2tpZXMsICRsb2csIGFsZXJ0c01hbmFnZXIsIEFQUENPTlNUQU5UUykge1xyXG5cclxuXHRcdHZhciBhdXRoT2JqZWN0ID0gIHtcclxuXHRcdFx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JHJvb3RTY29wZS5hdXRoVXNlciA9ICRjb29raWVzLmdldCgnYXV0aFVzZXInKTtcclxuXHRcdFx0XHQkcm9vdFNjb3BlLmF1dGhUb2tlbiA9ICRjb29raWVzLmdldCgnYXV0aFRva2VuJyk7XHJcblxyXG5cdFx0XHRcdCRyb290U2NvcGUuJHdhdGNoKGZ1bmN0aW9uKCkgeyBcclxuXHRcdFx0XHRcdHJldHVybiAkY29va2llcy5nZXQoJ2F1dGhVc2VyJyk7XHJcblx0XHRcdFx0fSwgZnVuY3Rpb24oYXV0aFVzZXIpIHtcclxuXHRcdFx0XHQgICAgJHJvb3RTY29wZS5hdXRoVXNlciA9IGF1dGhVc2VyO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQkcm9vdFNjb3BlLiR3YXRjaChmdW5jdGlvbigpIHsgXHJcblx0XHRcdFx0XHRyZXR1cm4gJGNvb2tpZXMuZ2V0KCdhdXRoVG9rZW4nKTsgXHJcblx0XHRcdFx0fSwgZnVuY3Rpb24oYXV0aFRva2VuKSB7XHJcblx0XHRcdFx0ICAgICRyb290U2NvcGUuYXV0aFRva2VuID0gYXV0aFRva2VuO1xyXG5cdCAgICBcdFx0XHQkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1DU1JGLVRva2VuJ10gPSBhdXRoVG9rZW47XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGxvZ2luOiBmdW5jdGlvbih1c2VyKSB7XHJcblx0XHRcdFx0JGh0dHAucG9zdChBUFBDT05TVEFOVFMuVVJMK0FQUENPTlNUQU5UUy5BUEkrJy91c2Vycy9sb2dpbicsIHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdGlmKHJlc3BvbnNlLmRhdGEuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0YWxlcnRzTWFuYWdlci5hZGRBbGVydChyZXNwb25zZS5kYXRhLmVycm9yLCAnYWxlcnQtZGFuZ2VyJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNldEF1dGhEZXRhaWxzKHJlc3BvbnNlLmRhdGEpO1xyXG5cdFx0XHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnL2FkbWluL2Rhc2hib2FyZCcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0uYmluZCh0aGlzKSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRcdCRsb2cubG9nKGVycm9yKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0bG9nb3V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkaHR0cC5nZXQoQVBQQ09OU1RBTlRTLlVSTCtBUFBDT05TVEFOVFMuQVBJKycvdXNlcnMvbG9nb3V0JykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHQgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0YWxlcnRzTWFuYWdlci5hZGRBbGVydChyZXNwb25zZS5kYXRhLmVycm9yLCAnYWxlcnQtZGFuZ2VyJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRlbGV0ZUF1dGhEZXRhaWxzKCk7XHJcblx0XHRcdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvYWRtaW4vdXNlcnMvbG9naW4nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0ICAgIH0uYmluZCh0aGlzKSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0ICAgIFx0JGxvZy5sb2coZXJyb3IpO1xyXG5cdFx0XHQgICAgfSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGlzTG9nZ2VkSW46IGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgIFx0cmV0dXJuIEJvb2xlYW4oJGNvb2tpZXMuZ2V0KCdhdXRoVG9rZW4nKSk7XHJcblx0XHQgICAgfSxcclxuXHRcdFx0Y2hlY2tBdXRoOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdFx0XHRcdCRodHRwLmdldChBUFBDT05TVEFOVFMuVVJMK0FQUENPTlNUQU5UUy5BUEkrJy91c2Vycy9sb2dpbicpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdGlmKHJlc3BvbnNlLmRhdGEuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0aWYoJ2Vycm9yJyBpbiBjYWxsYmFjaykgY2FsbGJhY2suZXJyb3IocmVzcG9uc2UuZGF0YSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNldEF1dGhEZXRhaWxzKHJlc3BvbnNlLmRhdGEpO1xyXG5cdFx0XHRcdFx0XHRpZignc3VjY2VzcycgaW4gY2FsbGJhY2spIGNhbGxiYWNrLnN1Y2Nlc3MocmVzcG9uc2UuZGF0YSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdCAgICB9LmJpbmQodGhpcyksIGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdCAgICBcdCRsb2cubG9nKGVycm9yKTtcclxuXHRcdFx0ICAgIFx0aWYoJ2Vycm9yJyBpbiBjYWxsYmFjaykgY2FsbGJhY2suZXJyb3IocmVzcG9uc2UuZGF0YSk7XHJcblx0XHRcdCAgICB9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0cmVnaXN0ZXI6IGZ1bmN0aW9uKHVzZXIpIHtcclxuXHRcdFx0XHQkaHR0cC5wb3N0KEFQUENPTlNUQU5UUy5VUkwrQVBQQ09OU1RBTlRTLkFQSSsnL3VzZXJzL3JlZ2lzdGVyJywgdXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0aWYocmVzcG9uc2UuZGF0YS5lcnJvcikge1xyXG5cdFx0XHRcdFx0XHRhbGVydHNNYW5hZ2VyLmFkZEFsZXJ0KHJlc3BvbnNlLmRhdGEuZXJyb3IsICdhbGVydC1kYW5nZXInKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0QXV0aERldGFpbHMocmVzcG9uc2UuZGF0YSk7XHJcblx0XHRcdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvYWRtaW4vZGFzaGJvYXJkJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fS5iaW5kKHRoaXMpLCBmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdFx0JGxvZy5sb2coZXJyb3IpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZXRBdXRoRGV0YWlsczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdCRjb29raWVzLnB1dE9iamVjdCgnYXV0aFVzZXInLCBkYXRhLnVzZXIpO1xyXG5cdFx0XHRcdCRjb29raWVzLnB1dCgnYXV0aFRva2VuJywgZGF0YS50b2tlbik7XHJcblx0XHRcdH0sXHJcblx0XHRcdGRlbGV0ZUF1dGhEZXRhaWxzOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkY29va2llcy5yZW1vdmUoJ2F1dGhVc2VyJyk7XHJcblx0XHRcdFx0JGNvb2tpZXMucmVtb3ZlKCdhdXRoVG9rZW4nKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Z2V0QXV0aFVzZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiAkY29va2llcy5nZXQoJ2F1dGhVc2VyJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXV0aE9iamVjdDtcclxuXHR9XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3Nob3BwaW5nLWNhcnQnKVxyXG4gICAgLmZhY3RvcnkoJ2F1dGhIdHRwUmVzcG9uc2VJbnRlcmNlcHRvcicsIFsnJHEnLCAnJGxvY2F0aW9uJywgJyRjb29raWVzJywgJyR0aW1lb3V0JywgZnVuY3Rpb24oJHEsICRsb2NhdGlvbiwgJGNvb2tpZXMsICR0aW1lb3V0KSB7XHJcbiAgICBcdHJldHVybiB7XHJcbiAgICAgICAgICAgIC8qcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb25maWcubWV0aG9kKTtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzWydYLUNTUkYtVG9rZW4nXSA9ICRjb29raWVzLmdldCgnYXV0aFRva2VuJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgICAgICB9LCovXHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIDQwM1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZSB8fCAkcS53aGVuKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24ocmVqZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvYWRtaW4vdXNlcnMvbG9naW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfV0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
