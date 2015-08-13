/* global fluxoAplicacao: false */
/* global mci: false */
/* global continuar: false */
(function(angular,undefined){

	'use strict';

	angular.module('moduloUsuario', ['ngResource','ui.bootstrap','ui.mask'])
	
	.controller("usuarioController",usuarioController);
	
	usuarioController.$inject = ['$http','$rootScope','$scope', 'GMRest', '$modal', 'MSG_TYPE'];
	
	function usuarioController($http, $rootScope, $scope, GMRest, $modal, MSG_TYPE) 
	{
		var vm = this;
		vm.dados = {};

		vm.listaQuadras = GMRest.consultar("viewQuadra");
		//vm.quadraSelecionada = {};

		$rootScope.msg(MSG_TYPE.E,"Mensagem de Erro");
		$rootScope.msg(MSG_TYPE.W,"Mensagem de Alerta");
		$rootScope.msg(MSG_TYPE.I,"Mensagem de Informação");
		$rootScope.msg(MSG_TYPE.S,"Mensagem de Sucesso");

		//vm.messages = $rootScope.messages;
		// $rootScope.messages = [
		// 	{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' }
		// ];

		// $rootScope.messages.push({ type: 'warning', msg: 'Well done! You successfully read this important alert message.' });


		vm.enderecoSelecionado = "";
		GMRest.consultar("viewEndereco").success(function(response){
			vm.listaEnderecos = response;
		});

		vm.setEndereco = function(item){
			vm.enderecoSelecionado = item;
		}

		vm.salvar = function(){

			vm.dados.id_quadra	 = vm.quadraSelecionada.id;
			vm.dados.id_endereco = vm.enderecoSelecionado.id;

			var teste = GMRest.inserir('morador',vm.dados);

			console.clear();
			console.log(teste);
		};

	}; //function usuarioController



})(angular);