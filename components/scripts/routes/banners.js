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