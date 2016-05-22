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