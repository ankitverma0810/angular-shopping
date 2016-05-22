angular.module('core')
	.controller('SidebarCtrl', ['$scope', '$location', '$state', '$timeout', function($scope, $location, $state, $timeout) {

		$scope.currentUrl = $state.current.url;

		$scope.init = function() {
			$scope.groups = $scope.getGroups();
			$scope.categories = $scope.getCategories();

			$timeout(function(){
		        angular.forEach($scope.groups, function(value, key) {
					if( value.subMenu !== undefined ) {
						angular.forEach(value.subMenu, function(innerValue, innerKey) {
							if( $state.current.url === innerValue.url ) {
								$('#'+value.title).collapse('show'); //for opening active tab
								$scope.groups[key].isOpen = true; //for showing right/down glyphicon icons on active tab
							}
						});
					}
				});
		    });
		};

		$scope.getGroups = function() {
			return [
				{
					title: 'Dashboard',
					url: '/admin/dashboard'
				},
				{
					title: 'Pages',
					subMenu: [
						{title: 'List pages', url: '/admin/pages'},
						{title: 'Add page', url: '/admin/pages/add'}
					]
				},
				{
					title: 'Banners',
					subMenu: [
						{title: 'List banners', url: '/admin/banners'},
						{title: 'Add banner', url: '/admin/banners/add'}
					]
				},
				{
					title: 'Categories',
					subMenu: [
						{title: 'List categories', url: '/admin/categories'},
						{title: 'Add category', url: '/admin/categories/add'}
					]
				},
				{
					title: 'Subcategories',
					subMenu: [
						{title: 'List subcategories', url: '/admin/subcategories'},
						{title: 'Add subcategory', url: '/admin/subcategories/add'}
					]
				},
				{
					title: 'Products',
					subMenu: [
						{title: 'List products', url: '/admin/products'},
						{title: 'Add product', url: '/admin/products/add'}
					]
				},
				{
					title: 'Attributes',
					subMenu: [
						{title: 'List attributes', url: '/admin/attributes'},
						{title: 'Add attribute', url: '/admin/attributes/add'}
					]
				},
				{
					title: 'Users',
					subMenu: [
						{title: 'List users', url: '/admin/users'},
						{title: 'Add user', url: '/admin/users/add'}
					]
				},
				{
					title: 'Roles',
					subMenu: [
						{title: 'List roles', url: '/admin/roles'},
						{title: 'Add role', url: '/admin/roles/add'}
					]
				},
				{
					title: 'Privileges',
					subMenu: [
						{title: 'List privileges', url: '/admin/privileges'},
						{title: 'Add privilege', url: '/admin/privileges/add'}
					]
				}
			];
		};

		$scope.getCategories = function() {
			return [
				{
					title: 'Men',
					content: [
						'Cute Kittens', 'Strange Stuff', 'Automatic Fails'
					]
				},
				{
					title: 'Women',
					content: [
						'Cute Kittens', 'Strange Stuff', 'Automatic Fails'
					]
				},
				{
					title: 'Kids',
					content: [
						'Cute Kittens', 'Strange Stuff', 'Automatic Fails'
					]
				},
				{
					title: 'Accesories',
					content: [
						'Cute Kittens', 'Strange Stuff', 'Automatic Fails'
					]
				},
				{
					title: 'Shoes'
				}
			];
		};

		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			$scope.currentUrl = toState.url;
	    });
	}]);