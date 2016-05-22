'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)
	   .constant('APPCONSTANTS', ApplicationConfiguration.applicationConstants);

angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {

		//Setting HTML5 Location Mode
		//$locationProvider.html5Mode({enabled: true});

		//Http Intercpetor to check auth failures for xhr requests
		//need to check whether its working or not
		$httpProvider.interceptors.push('authHttpResponseInterceptor');
	}
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(['Authentication', function(Authentication) {
    Authentication.init();
}]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});