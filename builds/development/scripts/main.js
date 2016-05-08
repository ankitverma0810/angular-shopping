'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'shopping-cart';
	var applicationModuleVendorDependencies = ['ngCookies',  'ngAnimate', 'ngSanitize',  'ui.router', 'ui.bootstrap'];

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
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
/*angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode({enabled: true});
	}
]);*/

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

//jquery functions
/*$(window).load(function() {
	$('.dropdown-slideToggle').click(function() {
		$(this).next('.dropdown-menu').slideToggle();
		$(this).parent().toggleClass('open');
		return false;
	});
});*/
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
		state('dashboard', {
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

angular.module('dashboard')
	.controller('DashboardCtrl', ['$scope', function($scope) {
}]);
angular.module('core')
	.controller('FooterCtrl', ['$scope', function($scope) {	
}]);
angular.module('core')
	.controller('HeaderCtrl', ['$scope', function($scope) {	
}]);
angular.module('pages')
	.controller('PagesCtrl', ['$scope', function($scope) {
}]);
angular.module('products')
	.controller('ProductCtrl', ['$scope', function($scope) {
}]);
angular.module('core')
	.controller('SidebarCtrl', ['$scope', '$location', '$state', function($scope, $location, $state) {
		$scope.oneAtATime = false;

		$scope.groups = [
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
				title: 'Products',
				subMenu: [
					{title: 'List products', url: '/admin/products'},
					{title: 'Add product', url: '/admin/products/add'}
				]
			}
		];

		$scope.categories = [
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

		$scope.redirect = function(url) {
			if(url !== undefined && url !== '') $location.url(url);
		};

		$scope.init = function() {
			angular.forEach($scope.groups, function(value, key) {
				if( value.subMenu !== undefined ) {
					angular.forEach(value.subMenu, function(innerValue, innerKey) {
						console.log($state.current.url);
						//console.log(innerValue.url);

						if($state.current.url === innerValue.url) {
							//console.log(innerValue.url);
							$scope.groups[key].open = true;
						}
					});
				}
			});
			//console.log($scope.groups);
		}

		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			console.log(toState);
	        $scope.init();
	    });
	}]);
angular.module('users')
	.controller('UserCtrl', ['$scope', function($scope) {
}]);
'use strict';

angular.module('shopping-cart')
    .factory('alertsManager', ['$rootScope', function($rootScope) {
    $rootScope.alerts = [];
    $rootScope.currentMessage = "";

    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        $rootScope.currentMessage = $rootScope.alerts.shift() || "";
    });

    return {
        addAlert: function(message, type) {
            $rootScope.alerts.push({type: type, message: message});
        }
        /*closeAlert: function(index) {
          return $rootScope.alerts.splice(index, 1);
        },
        clearAlerts: function() {
            $rootScope.alerts = [];
        }*/
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImFwcC5qcyIsImNvcmUuanMiLCJkYXNoYm9hcmQuanMiLCJwYWdlcy5qcyIsInByb2R1Y3RzLmpzIiwidXNlcnMuanMiLCJjb250cm9sbGVycy9hbGVydC5qcyIsImNvbnRyb2xsZXJzL2Rhc2hib2FyZC5qcyIsImNvbnRyb2xsZXJzL2Zvb3Rlci5qcyIsImNvbnRyb2xsZXJzL2hlYWRlci5qcyIsImNvbnRyb2xsZXJzL3BhZ2UuanMiLCJjb250cm9sbGVycy9wcm9kdWN0LmpzIiwiY29udHJvbGxlcnMvc2lkZWJhci5qcyIsImNvbnRyb2xsZXJzL3VzZXIuanMiLCJzZXJ2aWNlcy9hbGVydHNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZGQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBJbml0IHRoZSBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uIG1vZHVsZSBmb3IgQW5ndWxhckpTIGFwcGxpY2F0aW9uXHJcbnZhciBBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24gPSAoZnVuY3Rpb24oKSB7XHJcblx0Ly8gSW5pdCBtb2R1bGUgY29uZmlndXJhdGlvbiBvcHRpb25zXHJcblx0dmFyIGFwcGxpY2F0aW9uTW9kdWxlTmFtZSA9ICdzaG9wcGluZy1jYXJ0JztcclxuXHR2YXIgYXBwbGljYXRpb25Nb2R1bGVWZW5kb3JEZXBlbmRlbmNpZXMgPSBbJ25nQ29va2llcycsICAnbmdBbmltYXRlJywgJ25nU2FuaXRpemUnLCAgJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnXTtcclxuXHJcblx0Ly8gQWRkIGEgbmV3IHZlcnRpY2FsIG1vZHVsZVxyXG5cdHZhciByZWdpc3Rlck1vZHVsZSA9IGZ1bmN0aW9uKG1vZHVsZU5hbWUsIGRlcGVuZGVuY2llcykge1xyXG5cdFx0Ly8gQ3JlYXRlIGFuZ3VsYXIgbW9kdWxlXHJcblx0XHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBkZXBlbmRlbmNpZXMgfHwgW10pO1xyXG5cclxuXHRcdC8vIEFkZCB0aGUgbW9kdWxlIHRvIHRoZSBBbmd1bGFySlMgY29uZmlndXJhdGlvbiBmaWxlXHJcblx0XHRhbmd1bGFyLm1vZHVsZShhcHBsaWNhdGlvbk1vZHVsZU5hbWUpLnJlcXVpcmVzLnB1c2gobW9kdWxlTmFtZSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGFwcGxpY2F0aW9uTW9kdWxlTmFtZTogYXBwbGljYXRpb25Nb2R1bGVOYW1lLFxyXG5cdFx0YXBwbGljYXRpb25Nb2R1bGVWZW5kb3JEZXBlbmRlbmNpZXM6IGFwcGxpY2F0aW9uTW9kdWxlVmVuZG9yRGVwZW5kZW5jaWVzLFxyXG5cdFx0cmVnaXN0ZXJNb2R1bGU6IHJlZ2lzdGVyTW9kdWxlXHJcblx0fTtcclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vL1N0YXJ0IGJ5IGRlZmluaW5nIHRoZSBtYWluIG1vZHVsZSBhbmQgYWRkaW5nIHRoZSBtb2R1bGUgZGVwZW5kZW5jaWVzXHJcbmFuZ3VsYXIubW9kdWxlKEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbk1vZHVsZU5hbWUsIEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbk1vZHVsZVZlbmRvckRlcGVuZGVuY2llcyk7XHJcblxyXG4vLyBTZXR0aW5nIEhUTUw1IExvY2F0aW9uIE1vZGVcclxuLyphbmd1bGFyLm1vZHVsZShBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Nb2R1bGVOYW1lKS5jb25maWcoWyckbG9jYXRpb25Qcm92aWRlcicsIGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyKSB7XHJcblx0XHQkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe2VuYWJsZWQ6IHRydWV9KTtcclxuXHR9XHJcbl0pOyovXHJcblxyXG4vL1RoZW4gZGVmaW5lIHRoZSBpbml0IGZ1bmN0aW9uIGZvciBzdGFydGluZyB1cCB0aGUgYXBwbGljYXRpb25cclxuYW5ndWxhci5lbGVtZW50KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHQvL1RoZW4gaW5pdCB0aGUgYXBwXHJcblx0YW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFtBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Nb2R1bGVOYW1lXSk7XHJcbn0pO1xyXG5cclxuLy9qcXVlcnkgZnVuY3Rpb25zXHJcbi8qJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0JCgnLmRyb3Bkb3duLXNsaWRlVG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMpLm5leHQoJy5kcm9wZG93bi1tZW51Jykuc2xpZGVUb2dnbGUoKTtcclxuXHRcdCQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxufSk7Ki8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBVc2UgQXBwbGljYWlvbiBjb25maWd1cmF0aW9uIG1vZHVsZSB0byByZWdpc3RlciBhIG5ldyBtb2R1bGVcclxuQXBwbGljYXRpb25Db25maWd1cmF0aW9uLnJlZ2lzdGVyTW9kdWxlKCdjb3JlJyk7XHJcblxyXG4vLyBTZXR0aW5nIHVwIHJvdXRlXHJcbmFuZ3VsYXIubW9kdWxlKCdjb3JlJykuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJyxcclxuXHRmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcblx0XHQvLyBSZWRpcmVjdCB0byBob21lIHZpZXcgd2hlbiByb3V0ZSBub3QgZm91bmRcclxuXHRcdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuXHJcblx0XHQvLyBIb21lIHN0YXRlIHJvdXRpbmdcclxuXHRcdCRzdGF0ZVByb3ZpZGVyLlxyXG5cdFx0c3RhdGUoJ2RlZmF1bHRMYXlvdXQnLCB7XHJcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgJ2xheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2xheW91dHMvZGVmYXVsdC5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdoZWFkZXJAZGVmYXVsdExheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2VsZW1lbnRzL2hlYWRlci5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSGVhZGVyQ3RybCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnZm9vdGVyQGRlZmF1bHRMYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9lbGVtZW50cy9mb290ZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0Zvb3RlckN0cmwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2FsZXJ0QGRlZmF1bHRMYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9sYXlvdXRzL2FsZXJ0Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBbGVydEN0cmwnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH0pXHJcbiAgICAgICAgLnN0YXRlKCdhZG1pbkxheW91dCcsIHtcclxuICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAnbGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbGF5b3V0cy9hZG1pbi5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdoZWFkZXJAYWRtaW5MYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9lbGVtZW50cy9hZG1pbi9oZWFkZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hlYWRlckN0cmwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2Zvb3RlckBhZG1pbkxheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2VsZW1lbnRzL2FkbWluL2Zvb3Rlci5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdzaWRlYmFyQGFkbWluTGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZWxlbWVudHMvYWRtaW4vc2lkZWJhci5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnU2lkZWJhckN0cmwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2FsZXJ0QGFkbWluTGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbGF5b3V0cy9hbGVydC5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQWxlcnRDdHJsJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2xvZ2luTGF5b3V0Jywge1xyXG4gICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICdsYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9sYXlvdXRzL2xvZ2luLmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2FsZXJ0QGxvZ2luTGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbGF5b3V0cy9hbGVydC5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQWxlcnRDdHJsJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblx0fVxyXG5dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBVc2UgQXBwbGljYWlvbiBjb25maWd1cmF0aW9uIG1vZHVsZSB0byByZWdpc3RlciBhIG5ldyBtb2R1bGVcclxuQXBwbGljYXRpb25Db25maWd1cmF0aW9uLnJlZ2lzdGVyTW9kdWxlKCdkYXNoYm9hcmQnKTtcclxuXHJcbi8vIFNldHRpbmcgdXAgcm91dGVcclxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJyxcclxuXHRmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xyXG5cdFx0Ly8gSG9tZSBzdGF0ZSByb3V0aW5nXHJcblx0XHQkc3RhdGVQcm92aWRlci5cclxuXHRcdHN0YXRlKCdkYXNoYm9hcmQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZG1pbi9kYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9hZG1pbl9pbmRleC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0Rhc2hib2FyZEN0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdhZG1pbkxheW91dCdcclxuICAgICAgICB9KTtcclxuXHR9XHJcbl0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFVzZSBBcHBsaWNhaW9uIGNvbmZpZ3VyYXRpb24gbW9kdWxlIHRvIHJlZ2lzdGVyIGEgbmV3IG1vZHVsZVxyXG5BcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24ucmVnaXN0ZXJNb2R1bGUoJ3BhZ2VzJyk7XHJcblxyXG4vLyBTZXR0aW5nIHVwIHJvdXRlXHJcbmFuZ3VsYXIubW9kdWxlKCdwYWdlcycpLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJyxcclxuXHRmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xyXG5cdFx0Ly8gSG9tZSBzdGF0ZSByb3V0aW5nXHJcblx0XHQkc3RhdGVQcm92aWRlci5cclxuXHRcdHN0YXRlKCdob21lJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9wYWdlcy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUGFnZXNDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGVmYXVsdExheW91dCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnY2hlY2tvdXQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9wYWdlcy9jaGVja291dCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcGFnZXMvY2hlY2tvdXQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlc0N0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkZWZhdWx0TGF5b3V0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCcvYWRtaW4vcGFnZXMnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZG1pbi9wYWdlcycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcGFnZXMvYWRtaW5faW5kZXguaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlc0N0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdhZG1pbkxheW91dCdcclxuICAgICAgICB9KTtcclxuXHR9XHJcbl0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFVzZSBBcHBsaWNhaW9uIGNvbmZpZ3VyYXRpb24gbW9kdWxlIHRvIHJlZ2lzdGVyIGEgbmV3IG1vZHVsZVxyXG5BcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24ucmVnaXN0ZXJNb2R1bGUoJ3Byb2R1Y3RzJyk7XHJcblxyXG4vLyBTZXR0aW5nIHVwIHJvdXRlXHJcbmFuZ3VsYXIubW9kdWxlKCdwcm9kdWN0cycpLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJyxcclxuXHRmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xyXG5cdFx0Ly8gdXNlciBzdGF0ZSByb3V0aW5nXHJcblx0XHQkc3RhdGVQcm92aWRlci5cclxuXHRcdHN0YXRlKCdwcm9kdWN0cycsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3Byb2R1Y3RzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9wcm9kdWN0cy9pbmRleC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1Byb2R1Y3RDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGVmYXVsdExheW91dCdcclxuICAgICAgICB9KTtcclxuXHR9XHJcbl0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFVzZSBBcHBsaWNhaW9uIGNvbmZpZ3VyYXRpb24gbW9kdWxlIHRvIHJlZ2lzdGVyIGEgbmV3IG1vZHVsZVxyXG5BcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24ucmVnaXN0ZXJNb2R1bGUoJ3VzZXJzJyk7XHJcblxyXG4vLyBTZXR0aW5nIHVwIHJvdXRlXHJcbmFuZ3VsYXIubW9kdWxlKCd1c2VycycpLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJyxcclxuXHRmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xyXG5cdFx0Ly8gdXNlciBzdGF0ZSByb3V0aW5nXHJcblx0XHQkc3RhdGVQcm92aWRlci5cclxuXHRcdHN0YXRlKCdsb2dpbicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3VzZXJzL2xvZ2luJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy91c2Vycy9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1VzZXJDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGVmYXVsdExheW91dCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgncmVnaXN0ZXInLCB7XHJcbiAgICAgICAgICAgIHVybDogJy91c2Vycy9yZWdpc3RlcicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvdXNlcnMvcmVnaXN0ZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyQ3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2RlZmF1bHRMYXlvdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2FkbWluL2xvZ2luJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vdXNlcnMvbG9naW4nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3VzZXJzL2FkbWluX2xvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnVXNlckN0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdsb2dpbkxheW91dCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWRtaW4vcmVnaXN0ZXInLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZG1pbi91c2Vycy9yZWdpc3RlcicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvdXNlcnMvYWRtaW5fcmVnaXN0ZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyQ3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2xvZ2luTGF5b3V0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhZG1pbi9mb3Jnb3RwYXNzd29yZCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkbWluL3VzZXJzL2ZvcmdvdC1wYXNzd29yZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvdXNlcnMvYWRtaW5fZm9yZ290X3Bhc3N3b3JkLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnVXNlckN0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdsb2dpbkxheW91dCdcclxuICAgICAgICB9KTtcclxuXHR9XHJcbl0pOyIsIid1c2Ugc3RyaWN0JztcclxuYW5ndWxhci5tb2R1bGUoJ2NvcmUnKVxyXG5cdC5jb250cm9sbGVyKCdBbGVydEN0cmwnLCBbJyRzY29wZScsICdhbGVydHNNYW5hZ2VyJywgZnVuY3Rpb24oJHNjb3BlLCBhbGVydHNNYW5hZ2VyKSB7XHJcblx0JHNjb3BlLmNsb3NlQWxlcnQgPSBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgIGFsZXJ0c01hbmFnZXIuY2xvc2VBbGVydChpbmRleCk7XHJcbiAgICB9O1x0XHJcbn1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXHJcblx0LmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2NvcmUnKVxyXG5cdC5jb250cm9sbGVyKCdGb290ZXJDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcdFxyXG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2NvcmUnKVxyXG5cdC5jb250cm9sbGVyKCdIZWFkZXJDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcdFxyXG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ3BhZ2VzJylcclxuXHQuY29udHJvbGxlcignUGFnZXNDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdwcm9kdWN0cycpXHJcblx0LmNvbnRyb2xsZXIoJ1Byb2R1Y3RDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdjb3JlJylcclxuXHQuY29udHJvbGxlcignU2lkZWJhckN0cmwnLCBbJyRzY29wZScsICckbG9jYXRpb24nLCAnJHN0YXRlJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sICRzdGF0ZSkge1xyXG5cdFx0JHNjb3BlLm9uZUF0QVRpbWUgPSBmYWxzZTtcclxuXHJcblx0XHQkc2NvcGUuZ3JvdXBzID0gW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGl0bGU6ICdEYXNoYm9hcmQnLFxyXG5cdFx0XHRcdHVybDogJy9hZG1pbi9kYXNoYm9hcmQnXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aXRsZTogJ1BhZ2VzJyxcclxuXHRcdFx0XHRzdWJNZW51OiBbXHJcblx0XHRcdFx0XHR7dGl0bGU6ICdMaXN0IHBhZ2VzJywgdXJsOiAnL2FkbWluL3BhZ2VzJ30sXHJcblx0XHRcdFx0XHR7dGl0bGU6ICdBZGQgcGFnZScsIHVybDogJy9hZG1pbi9wYWdlcy9hZGQnfVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRpdGxlOiAnQmFubmVycycsXHJcblx0XHRcdFx0c3ViTWVudTogW1xyXG5cdFx0XHRcdFx0e3RpdGxlOiAnTGlzdCBiYW5uZXJzJywgdXJsOiAnL2FkbWluL2Jhbm5lcnMnfSxcclxuXHRcdFx0XHRcdHt0aXRsZTogJ0FkZCBiYW5uZXInLCB1cmw6ICcvYWRtaW4vYmFubmVycy9hZGQnfVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRpdGxlOiAnUHJvZHVjdHMnLFxyXG5cdFx0XHRcdHN1Yk1lbnU6IFtcclxuXHRcdFx0XHRcdHt0aXRsZTogJ0xpc3QgcHJvZHVjdHMnLCB1cmw6ICcvYWRtaW4vcHJvZHVjdHMnfSxcclxuXHRcdFx0XHRcdHt0aXRsZTogJ0FkZCBwcm9kdWN0JywgdXJsOiAnL2FkbWluL3Byb2R1Y3RzL2FkZCd9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHRdO1xyXG5cclxuXHRcdCRzY29wZS5jYXRlZ29yaWVzID0gW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGl0bGU6ICdNZW4nLFxyXG5cdFx0XHRcdGNvbnRlbnQ6IFtcclxuXHRcdFx0XHRcdCdDdXRlIEtpdHRlbnMnLCAnU3RyYW5nZSBTdHVmZicsICdBdXRvbWF0aWMgRmFpbHMnXHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGl0bGU6ICdXb21lbicsXHJcblx0XHRcdFx0Y29udGVudDogW1xyXG5cdFx0XHRcdFx0J0N1dGUgS2l0dGVucycsICdTdHJhbmdlIFN0dWZmJywgJ0F1dG9tYXRpYyBGYWlscydcclxuXHRcdFx0XHRdXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aXRsZTogJ0tpZHMnLFxyXG5cdFx0XHRcdGNvbnRlbnQ6IFtcclxuXHRcdFx0XHRcdCdDdXRlIEtpdHRlbnMnLCAnU3RyYW5nZSBTdHVmZicsICdBdXRvbWF0aWMgRmFpbHMnXHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGl0bGU6ICdBY2Nlc29yaWVzJyxcclxuXHRcdFx0XHRjb250ZW50OiBbXHJcblx0XHRcdFx0XHQnQ3V0ZSBLaXR0ZW5zJywgJ1N0cmFuZ2UgU3R1ZmYnLCAnQXV0b21hdGljIEZhaWxzJ1xyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRpdGxlOiAnU2hvZXMnXHJcblx0XHRcdH1cclxuXHRcdF07XHJcblxyXG5cdFx0JHNjb3BlLnJlZGlyZWN0ID0gZnVuY3Rpb24odXJsKSB7XHJcblx0XHRcdGlmKHVybCAhPT0gdW5kZWZpbmVkICYmIHVybCAhPT0gJycpICRsb2NhdGlvbi51cmwodXJsKTtcclxuXHRcdH07XHJcblxyXG5cdFx0JHNjb3BlLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0YW5ndWxhci5mb3JFYWNoKCRzY29wZS5ncm91cHMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcclxuXHRcdFx0XHRpZiggdmFsdWUuc3ViTWVudSAhPT0gdW5kZWZpbmVkICkge1xyXG5cdFx0XHRcdFx0YW5ndWxhci5mb3JFYWNoKHZhbHVlLnN1Yk1lbnUsIGZ1bmN0aW9uKGlubmVyVmFsdWUsIGlubmVyS2V5KSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCRzdGF0ZS5jdXJyZW50LnVybCk7XHJcblx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coaW5uZXJWYWx1ZS51cmwpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYoJHN0YXRlLmN1cnJlbnQudXJsID09PSBpbm5lclZhbHVlLnVybCkge1xyXG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coaW5uZXJWYWx1ZS51cmwpO1xyXG5cdFx0XHRcdFx0XHRcdCRzY29wZS5ncm91cHNba2V5XS5vcGVuID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZygkc2NvcGUuZ3JvdXBzKTtcclxuXHRcdH1cclxuXHJcblx0XHQkc2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKXtcclxuXHRcdFx0Y29uc29sZS5sb2codG9TdGF0ZSk7XHJcblx0ICAgICAgICAkc2NvcGUuaW5pdCgpO1xyXG5cdCAgICB9KTtcclxuXHR9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ3VzZXJzJylcclxuXHQuY29udHJvbGxlcignVXNlckN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG59XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3Nob3BwaW5nLWNhcnQnKVxyXG4gICAgLmZhY3RvcnkoJ2FsZXJ0c01hbmFnZXInLCBbJyRyb290U2NvcGUnLCBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XHJcbiAgICAkcm9vdFNjb3BlLmFsZXJ0cyA9IFtdO1xyXG4gICAgJHJvb3RTY29wZS5jdXJyZW50TWVzc2FnZSA9IFwiXCI7XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oXCIkc3RhdGVDaGFuZ2VTdWNjZXNzXCIsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50TWVzc2FnZSA9ICRyb290U2NvcGUuYWxlcnRzLnNoaWZ0KCkgfHwgXCJcIjtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkQWxlcnQ6IGZ1bmN0aW9uKG1lc3NhZ2UsIHR5cGUpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5hbGVydHMucHVzaCh7dHlwZTogdHlwZSwgbWVzc2FnZTogbWVzc2FnZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKmNsb3NlQWxlcnQ6IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgICByZXR1cm4gJHJvb3RTY29wZS5hbGVydHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsZWFyQWxlcnRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5hbGVydHMgPSBbXTtcclxuICAgICAgICB9Ki9cclxuICAgIH07XHJcbn1dKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
