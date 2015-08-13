(function (angular, undefined) {

	'use strict';

	angular.module('bannerDirectives', [])

	.directive ('gmBanner', ['$http', function($http){
		return {
			restrict: 'E',
			scope: {
			},
			templateUrl: 'tpl/banner.tpl.html',
			controller: function($scope){

				$scope.w = 846;
				$scope.h = 282;
				$scope.uri = "http://lorempixel.com";
				$scope.folders = [
				'abstract',
				'animals',
				'business',
				'cats',
				'city',
				'food',
				'night',
				'life',
				'fashion',
				'people',
				'nature',
				'sports',
				'technics',
				'transport'
				];

				var conteudo = null; // TODO: mock
				
				// $scope.images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				$http.get("/gm/rest/banner", { params: null }, conteudo).success(function (response) {
					$scope.images = response;
				});


				$scope.currentFolder = $scope.folders[0];
				$scope.selectFolder = function (folder) {
					$scope.currentFolder = folder;
				};
				$scope.activeFolder = function (folder) {
					return (folder === $scope.currentFolder) ? 'active' : '';
				};

			},
			link: function(scope,element,attrs,ctrl){
			}
		};
	}])

;

})(angular);