'use strict';

angular.module('core')
	.filter('slug', ['$filter', function($filter) {
		return function(word, replacement ) {
	        if (!angular.isString(word)) {
	            return word;
	        }
	        return $filter('lowercase')(word.replace(/\s+/g, replacement));
	    };
	}]);