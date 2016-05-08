'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
/*angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode({enabled: true});
	}
]);*/

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

//jquery functions
/*$(window).load(function() {
	$('.dropdown-slideToggle').click(function() {
		$(this).next('.dropdown-menu').slideToggle();
		$(this).parent().toggleClass('open');
		return false;
	});
});*/