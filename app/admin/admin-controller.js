(function(angular,undefined){

	'use strict';

	angular.module('moduloAdminController', ['ngResource'])
	
	.controller("adminController",adminController);
	
	adminController.$inject = ['$http','$rootScope','$scope','$location', '$routeParams'];
	
	function adminController($http, $rootScope, $scope, $location, $routeParams) 
	{
		var vm = this;

		vm.messages = $rootScope.messages;
		
		$rootScope.$watch('messages', function(newValue, oldValue) { 
			console.clear();
			console.log(newValue);
			vm.messages = newValue;
		});

		vm.closeMessage = function(index) {
			$rootScope.messages.splice(index, 1);
		};


		// console.clear();
		// console.log($location.$$url);

		vm.location = $location.$$path.replace(/\//g, "");

		// para esconder o menu de acordo com a página navegada
		switch(vm.location){
			case "usuario": vm.semMenu = true;
				break;
			default: vm.semMenu = false; break;
		}

	}; //function adminController

})(angular);