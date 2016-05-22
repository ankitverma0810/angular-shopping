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