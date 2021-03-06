'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'shopping-cart';
	var applicationModuleVendorDependencies = ['ngCookies',  'ngAnimate', 'ngSanitize',  'ui.router', 'ui.bootstrap'];
	var applicationConstants = {
		SITENAME: 'Shopping Cart',
        ROOT: '/',
        URL: 'http://localhost/angular-shopping-backend',
        API: '/admin'
	};

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
		registerModule: registerModule,
		applicationConstants: applicationConstants
	};
})();