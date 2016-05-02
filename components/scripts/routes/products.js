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