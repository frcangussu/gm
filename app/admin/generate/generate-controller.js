(function(angular,undefined){

	'use strict';


	angular.module('moduloGenerate', ['ngResource'])
	
	.controller("generateController",generateController);
	
	generateController.$inject = ['$http','$rootScope','$scope','GMRest', '$modal'];
	
	function generateController($http, $rootScope, $scope, GMRest, $modal) 
	{
		var vm = this;

		vm.listaRua = [];
		vm.adicionarRua = function(){

			// limpa
			vm.listaRua = [];
			
			if (vm.rua){

				var inicio = "A";
				var fim = vm.rua;

				var nI = inicio.toUpperCase().charCodeAt(0); 
				var nF = fim.toUpperCase().charCodeAt(0);

				var rua = "";
				for (var i=nI;i<=nF;i++){
					rua = String.fromCharCode(i); 
					vm.listaRua.push(rua);
				}

			}

			//define o focus()
			$scope.$emit("focoRua");

			vm.rua = null;
		};

		vm.sql = null;
		vm.gerarSql = function (){
			vm.sql=[];
			var rua = "";
			var casa = "";

			for(var j in vm.listaRua){
				for (var i = 1; i<= vm.nrCasas; i++){
					casa = ("00000000000"+i).slice(-2,-1)+("0"+i).slice(-1);
					rua = vm.listaRua[j];
					vm.sql.push("insert into endereco (rua, casa, unidade) values('"+rua+"','"+casa+"','"+rua+casa+"');");
				}
			}
		};
	}; // function catego

})(angular);