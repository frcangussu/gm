(function(angular,undefined){

	'use strict';


	angular.module('moduloFiltro', ['ngResource'])
	
	.controller("filtroController",filtroController);
	
	filtroController.$inject = ['$http','$rootScope','$scope','GMRest', '$modal'];
	
	function filtroController($http, $rootScope, $scope, GMRest, $modal) 
	{

		var vm = this;
		vm.teste = "abc";

		GMRest.getFiltros().success(function(response){
			vm.filtros = response;
		});

	   // Close alert message
	    vm.closeAlert = function(index) {
	        vm.alerts.splice(index, 1);
	    };


	    // Modal
	    vm.open = function(objFiltro) {
	    	console.clear();
	    	console.log(objFiltro);
	    	var modalInstance = $modal.open({
	    		templateUrl: 'add_filtro_modal',
	    		controller: vm.modalCtrl,
	    		resolve: {
	    					objFiltro: function() {
	    						return objFiltro;
		    			}
		    		}
	    	});
	    };

	    vm.modalCtrl = function($scope, $modalInstance, GMRest, objFiltro) {
	    	
	    	$scope.filtro = {};
	        $scope.alerts = [];         // array of alert message objects.

	        // if clicked edit. id comes from $scope.modal->userId
	        if (angular.isDefined(objFiltro)) {

	        	$scope.filtro = objFiltro;

	        } 

	        // close modal
	        $scope.cancel = function() {
	        	$modalInstance.dismiss('cancel');
	        };

	        // Add new user
	        $scope.add = function() {
	        	
	        	//GMRest.inserir($scope.filtro)
	        	//GMRest.alterarFiltro($scope.filtro);
	        	
	        	$modalInstance.dismiss('cancel');
	        };

	        // Save edited user.
	        $scope.save = function() {

	        	//GMRest.alterar($scope.filtro);
	        	GMRest.alterarFiltro($scope.filtro);

	        	$modalInstance.dismiss('cancel');
	        };
    	};

	}; //function filtroController

})(angular);