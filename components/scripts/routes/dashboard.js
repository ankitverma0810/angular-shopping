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