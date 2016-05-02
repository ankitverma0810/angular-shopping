'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'shopping-cart';
	var applicationModuleVendorDependencies = ['ngCookies',  'ngSanitize',  'ui.router', 'ui.bootstrap'];

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
$(window).load(function() {
	$('li.dropdown a').click(function() {
		$(this).next('.dropdown-menu').slideToggle();
		return false;
	});
});
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
                    templateUrl: 'views/elements/admin/sidebar.html'
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
            controller: 'HomeCtrl',
            parent: 'defaultLayout'
        })
        .state('checkout', {
            url: '/pages/checkout',
            templateUrl: 'views/pages/checkout.html',
            controller: 'HomeCtrl',
            parent: 'defaultLayout'
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
	.controller('HomeCtrl', ['$scope', function($scope) {
}]);
angular.module('products')
	.controller('ProductCtrl', ['$scope', function($scope) {
}]);
angular.module('core')
	.controller('SidebarCtrl', ['$scope', function($scope) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImFwcC5qcyIsImNvcmUuanMiLCJkYXNoYm9hcmQuanMiLCJwYWdlcy5qcyIsInByb2R1Y3RzLmpzIiwidXNlcnMuanMiLCJjb250cm9sbGVycy9hbGVydC5qcyIsImNvbnRyb2xsZXJzL2Rhc2hib2FyZC5qcyIsImNvbnRyb2xsZXJzL2Zvb3Rlci5qcyIsImNvbnRyb2xsZXJzL2hlYWRlci5qcyIsImNvbnRyb2xsZXJzL2hvbWUuanMiLCJjb250cm9sbGVycy9wcm9kdWN0LmpzIiwiY29udHJvbGxlcnMvc2lkZWJhci5qcyIsImNvbnRyb2xsZXJzL3VzZXIuanMiLCJzZXJ2aWNlcy9hbGVydHNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEluaXQgdGhlIGFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24gbW9kdWxlIGZvciBBbmd1bGFySlMgYXBwbGljYXRpb25cclxudmFyIEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbiA9IChmdW5jdGlvbigpIHtcclxuXHQvLyBJbml0IG1vZHVsZSBjb25maWd1cmF0aW9uIG9wdGlvbnNcclxuXHR2YXIgYXBwbGljYXRpb25Nb2R1bGVOYW1lID0gJ3Nob3BwaW5nLWNhcnQnO1xyXG5cdHZhciBhcHBsaWNhdGlvbk1vZHVsZVZlbmRvckRlcGVuZGVuY2llcyA9IFsnbmdDb29raWVzJywgICduZ1Nhbml0aXplJywgICd1aS5yb3V0ZXInLCAndWkuYm9vdHN0cmFwJ107XHJcblxyXG5cdC8vIEFkZCBhIG5ldyB2ZXJ0aWNhbCBtb2R1bGVcclxuXHR2YXIgcmVnaXN0ZXJNb2R1bGUgPSBmdW5jdGlvbihtb2R1bGVOYW1lLCBkZXBlbmRlbmNpZXMpIHtcclxuXHRcdC8vIENyZWF0ZSBhbmd1bGFyIG1vZHVsZVxyXG5cdFx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgZGVwZW5kZW5jaWVzIHx8IFtdKTtcclxuXHJcblx0XHQvLyBBZGQgdGhlIG1vZHVsZSB0byB0aGUgQW5ndWxhckpTIGNvbmZpZ3VyYXRpb24gZmlsZVxyXG5cdFx0YW5ndWxhci5tb2R1bGUoYXBwbGljYXRpb25Nb2R1bGVOYW1lKS5yZXF1aXJlcy5wdXNoKG1vZHVsZU5hbWUpO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRhcHBsaWNhdGlvbk1vZHVsZU5hbWU6IGFwcGxpY2F0aW9uTW9kdWxlTmFtZSxcclxuXHRcdGFwcGxpY2F0aW9uTW9kdWxlVmVuZG9yRGVwZW5kZW5jaWVzOiBhcHBsaWNhdGlvbk1vZHVsZVZlbmRvckRlcGVuZGVuY2llcyxcclxuXHRcdHJlZ2lzdGVyTW9kdWxlOiByZWdpc3Rlck1vZHVsZVxyXG5cdH07XHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy9TdGFydCBieSBkZWZpbmluZyB0aGUgbWFpbiBtb2R1bGUgYW5kIGFkZGluZyB0aGUgbW9kdWxlIGRlcGVuZGVuY2llc1xyXG5hbmd1bGFyLm1vZHVsZShBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Nb2R1bGVOYW1lLCBBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Nb2R1bGVWZW5kb3JEZXBlbmRlbmNpZXMpO1xyXG5cclxuLy8gU2V0dGluZyBIVE1MNSBMb2NhdGlvbiBNb2RlXHJcbi8qYW5ndWxhci5tb2R1bGUoQXBwbGljYXRpb25Db25maWd1cmF0aW9uLmFwcGxpY2F0aW9uTW9kdWxlTmFtZSkuY29uZmlnKFsnJGxvY2F0aW9uUHJvdmlkZXInLCBmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlcikge1xyXG5cdFx0JGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtlbmFibGVkOiB0cnVlfSk7XHJcblx0fVxyXG5dKTsqL1xyXG5cclxuLy9UaGVuIGRlZmluZSB0aGUgaW5pdCBmdW5jdGlvbiBmb3Igc3RhcnRpbmcgdXAgdGhlIGFwcGxpY2F0aW9uXHJcbmFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0Ly9UaGVuIGluaXQgdGhlIGFwcFxyXG5cdGFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbQXBwbGljYXRpb25Db25maWd1cmF0aW9uLmFwcGxpY2F0aW9uTW9kdWxlTmFtZV0pO1xyXG59KTtcclxuXHJcbi8vanF1ZXJ5IGZ1bmN0aW9uc1xyXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcclxuXHQkKCdsaS5kcm9wZG93biBhJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMpLm5leHQoJy5kcm9wZG93bi1tZW51Jykuc2xpZGVUb2dnbGUoKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gVXNlIEFwcGxpY2Fpb24gY29uZmlndXJhdGlvbiBtb2R1bGUgdG8gcmVnaXN0ZXIgYSBuZXcgbW9kdWxlXHJcbkFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5yZWdpc3Rlck1vZHVsZSgnY29yZScpO1xyXG5cclxuLy8gU2V0dGluZyB1cCByb3V0ZVxyXG5hbmd1bGFyLm1vZHVsZSgnY29yZScpLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsXHJcblx0ZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG5cdFx0Ly8gUmVkaXJlY3QgdG8gaG9tZSB2aWV3IHdoZW4gcm91dGUgbm90IGZvdW5kXHJcblx0XHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XHJcblxyXG5cdFx0Ly8gSG9tZSBzdGF0ZSByb3V0aW5nXHJcblx0XHQkc3RhdGVQcm92aWRlci5cclxuXHRcdHN0YXRlKCdkZWZhdWx0TGF5b3V0Jywge1xyXG5cdFx0XHRhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICdsYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9sYXlvdXRzL2RlZmF1bHQuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnaGVhZGVyQGRlZmF1bHRMYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9lbGVtZW50cy9oZWFkZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hlYWRlckN0cmwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2Zvb3RlckBkZWZhdWx0TGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZWxlbWVudHMvZm9vdGVyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdGb290ZXJDdHJsJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdhbGVydEBkZWZhdWx0TGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbGF5b3V0cy9hbGVydC5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQWxlcnRDdHJsJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblx0XHR9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWRtaW5MYXlvdXQnLCB7XHJcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgJ2xheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2xheW91dHMvYWRtaW4uaHRtbCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnaGVhZGVyQGFkbWluTGF5b3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZWxlbWVudHMvYWRtaW4vaGVhZGVyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIZWFkZXJDdHJsJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdmb290ZXJAYWRtaW5MYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9lbGVtZW50cy9hZG1pbi9mb290ZXIuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnc2lkZWJhckBhZG1pbkxheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2VsZW1lbnRzL2FkbWluL3NpZGViYXIuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnYWxlcnRAYWRtaW5MYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9sYXlvdXRzL2FsZXJ0Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBbGVydEN0cmwnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbG9naW5MYXlvdXQnLCB7XHJcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgJ2xheW91dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2xheW91dHMvbG9naW4uaHRtbCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnYWxlcnRAbG9naW5MYXlvdXQnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9sYXlvdXRzL2FsZXJ0Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBbGVydEN0cmwnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHR9XHJcbl0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFVzZSBBcHBsaWNhaW9uIGNvbmZpZ3VyYXRpb24gbW9kdWxlIHRvIHJlZ2lzdGVyIGEgbmV3IG1vZHVsZVxyXG5BcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24ucmVnaXN0ZXJNb2R1bGUoJ2Rhc2hib2FyZCcpO1xyXG5cclxuLy8gU2V0dGluZyB1cCByb3V0ZVxyXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJykuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLFxyXG5cdGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblx0XHQvLyBIb21lIHN0YXRlIHJvdXRpbmdcclxuXHRcdCRzdGF0ZVByb3ZpZGVyLlxyXG5cdFx0c3RhdGUoJ2Rhc2hib2FyZCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkbWluL2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2FkbWluX2luZGV4Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2FkbWluTGF5b3V0J1xyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gVXNlIEFwcGxpY2Fpb24gY29uZmlndXJhdGlvbiBtb2R1bGUgdG8gcmVnaXN0ZXIgYSBuZXcgbW9kdWxlXHJcbkFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5yZWdpc3Rlck1vZHVsZSgncGFnZXMnKTtcclxuXHJcbi8vIFNldHRpbmcgdXAgcm91dGVcclxuYW5ndWxhci5tb2R1bGUoJ3BhZ2VzJykuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLFxyXG5cdGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblx0XHQvLyBIb21lIHN0YXRlIHJvdXRpbmdcclxuXHRcdCRzdGF0ZVByb3ZpZGVyLlxyXG5cdFx0c3RhdGUoJ2hvbWUnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3BhZ2VzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2RlZmF1bHRMYXlvdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2NoZWNrb3V0Jywge1xyXG4gICAgICAgICAgICB1cmw6ICcvcGFnZXMvY2hlY2tvdXQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3BhZ2VzL2NoZWNrb3V0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkZWZhdWx0TGF5b3V0J1xyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gVXNlIEFwcGxpY2Fpb24gY29uZmlndXJhdGlvbiBtb2R1bGUgdG8gcmVnaXN0ZXIgYSBuZXcgbW9kdWxlXHJcbkFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5yZWdpc3Rlck1vZHVsZSgncHJvZHVjdHMnKTtcclxuXHJcbi8vIFNldHRpbmcgdXAgcm91dGVcclxuYW5ndWxhci5tb2R1bGUoJ3Byb2R1Y3RzJykuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLFxyXG5cdGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblx0XHQvLyB1c2VyIHN0YXRlIHJvdXRpbmdcclxuXHRcdCRzdGF0ZVByb3ZpZGVyLlxyXG5cdFx0c3RhdGUoJ3Byb2R1Y3RzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvcHJvZHVjdHMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3Byb2R1Y3RzL2luZGV4Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUHJvZHVjdEN0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkZWZhdWx0TGF5b3V0J1xyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gVXNlIEFwcGxpY2Fpb24gY29uZmlndXJhdGlvbiBtb2R1bGUgdG8gcmVnaXN0ZXIgYSBuZXcgbW9kdWxlXHJcbkFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5yZWdpc3Rlck1vZHVsZSgndXNlcnMnKTtcclxuXHJcbi8vIFNldHRpbmcgdXAgcm91dGVcclxuYW5ndWxhci5tb2R1bGUoJ3VzZXJzJykuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLFxyXG5cdGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblx0XHQvLyB1c2VyIHN0YXRlIHJvdXRpbmdcclxuXHRcdCRzdGF0ZVByb3ZpZGVyLlxyXG5cdFx0c3RhdGUoJ2xvZ2luJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvdXNlcnMvbG9naW4nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3VzZXJzL2xvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnVXNlckN0cmwnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkZWZhdWx0TGF5b3V0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdyZWdpc3RlcicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3VzZXJzL3JlZ2lzdGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy91c2Vycy9yZWdpc3Rlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1VzZXJDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGVmYXVsdExheW91dCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWRtaW4vbG9naW4nLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZG1pbi91c2Vycy9sb2dpbicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvdXNlcnMvYWRtaW5fbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyQ3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2xvZ2luTGF5b3V0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhZG1pbi9yZWdpc3RlcicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkbWluL3VzZXJzL3JlZ2lzdGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy91c2Vycy9hZG1pbl9yZWdpc3Rlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1VzZXJDdHJsJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnbG9naW5MYXlvdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2FkbWluL2ZvcmdvdHBhc3N3b3JkJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vdXNlcnMvZm9yZ290LXBhc3N3b3JkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy91c2Vycy9hZG1pbl9mb3Jnb3RfcGFzc3dvcmQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyQ3RybCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2xvZ2luTGF5b3V0J1xyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5hbmd1bGFyLm1vZHVsZSgnY29yZScpXHJcblx0LmNvbnRyb2xsZXIoJ0FsZXJ0Q3RybCcsIFsnJHNjb3BlJywgJ2FsZXJ0c01hbmFnZXInLCBmdW5jdGlvbigkc2NvcGUsIGFsZXJ0c01hbmFnZXIpIHtcclxuXHQkc2NvcGUuY2xvc2VBbGVydCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgYWxlcnRzTWFuYWdlci5jbG9zZUFsZXJ0KGluZGV4KTtcclxuICAgIH07XHRcclxufV0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcclxuXHQuY29udHJvbGxlcignRGFzaGJvYXJkQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnY29yZScpXHJcblx0LmNvbnRyb2xsZXIoJ0Zvb3RlckN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1x0XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnY29yZScpXHJcblx0LmNvbnRyb2xsZXIoJ0hlYWRlckN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1x0XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgncGFnZXMnKVxyXG5cdC5jb250cm9sbGVyKCdIb21lQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgncHJvZHVjdHMnKVxyXG5cdC5jb250cm9sbGVyKCdQcm9kdWN0Q3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnY29yZScpXHJcblx0LmNvbnRyb2xsZXIoJ1NpZGViYXJDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCd1c2VycycpXHJcblx0LmNvbnRyb2xsZXIoJ1VzZXJDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxufV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdzaG9wcGluZy1jYXJ0JylcclxuICAgIC5mYWN0b3J5KCdhbGVydHNNYW5hZ2VyJywgWyckcm9vdFNjb3BlJywgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xyXG4gICAgJHJvb3RTY29wZS5hbGVydHMgPSBbXTtcclxuICAgICRyb290U2NvcGUuY3VycmVudE1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKFwiJHN0YXRlQ2hhbmdlU3VjY2Vzc1wiLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xyXG4gICAgICAgICRyb290U2NvcGUuY3VycmVudE1lc3NhZ2UgPSAkcm9vdFNjb3BlLmFsZXJ0cy5zaGlmdCgpIHx8IFwiXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFkZEFsZXJ0OiBmdW5jdGlvbihtZXNzYWdlLCB0eXBlKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYWxlcnRzLnB1c2goe3R5cGU6IHR5cGUsIG1lc3NhZ2U6IG1lc3NhZ2V9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypjbG9zZUFsZXJ0OiBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgICAgcmV0dXJuICRyb290U2NvcGUuYWxlcnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGVhckFsZXJ0czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYWxlcnRzID0gW107XHJcbiAgICAgICAgfSovXHJcbiAgICB9O1xyXG59XSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
