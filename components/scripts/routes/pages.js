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