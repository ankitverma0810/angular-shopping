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