angular.module('core')
	.controller('SidebarCtrl', ['$scope', '$location', '$state', function($scope, $location, $state) {
		$scope.oneAtATime = false;

		$scope.groups = [
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
				title: 'Products',
				subMenu: [
					{title: 'List products', url: '/admin/products'},
					{title: 'Add product', url: '/admin/products/add'}
				]
			}
		];

		$scope.categories = [
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

		$scope.redirect = function(url) {
			if(url !== undefined && url !== '') $location.url(url);
		};

		$scope.init = function() {
			angular.forEach($scope.groups, function(value, key) {
				if( value.subMenu !== undefined ) {
					angular.forEach(value.subMenu, function(innerValue, innerKey) {
						console.log($state.current.url);
						//console.log(innerValue.url);

						if($state.current.url === innerValue.url) {
							//console.log(innerValue.url);
							$scope.groups[key].open = true;
						}
					});
				}
			});
			//console.log($scope.groups);
		}

		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			console.log(toState);
	        $scope.init();
	    });
	}]);