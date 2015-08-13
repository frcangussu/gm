/* global fluxoAplicacao: false */
/* global mci: false */
/* global continuar: false */
(function(angular,undefined){

	'use strict';

	angular.module('moduloGMController', ['ngResource'])
	
	.controller("gmController",gmController);
	
	gmController.$inject = ['$http','$rootScope','$scope', 'GMRest', '$modal'];
	
	function gmController($http, $rootScope, $scope , GMRest, $modal) 
	{

		$scope.$emit('focoPesquisar', true);

		var vm = this;
		vm.teste = "abc";

		console.clear();
		//GMRest.getCategorias().success(function(response){
		GMRest.consultar("categoria",['id_pai is null']).success(function(response){
			vm.categorias = response;
		});

		// abre uma modal Anuncio
	    vm.abrirAnuncio = function(dados){
	    	$scope.$broadcast('modal_anuncio', dados);
	    }

	    // abre modal de Login
	    vm.abrirLogin = function(){
	    	$scope.$broadcast('modal_login');
	    }

		vm.ctrlModalAnuncio = {
			titulo: "anuncio"
		};

		vm.ctrlModalUsuario = {
			titulo: "usuario"
		};

		vm.ctrlModalLogin = {
			titulo: "login",
		    abrirCadastroUsuario: function($modal){
		    	document.location.href="/gm/app/admin/#/usuario/";
		    	//$scope.$broadcast('modal_usuario');
		    }
		};

		// banner
		vm.myInterval = 4000;
		GMRest.consultar("banner",["ativo=1"]).success(function(listaBanner){
			vm.slides = listaBanner;
		});

	}; //function gmController



})(angular);