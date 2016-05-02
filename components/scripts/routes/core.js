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