(function(angular,undefined){

	'use strict';


	angular.module('moduloCategoria', ['ngResource'])
	
	.controller("categoriaController",categoriaController);
	
	categoriaController.$inject = ['$http','$rootScope','$scope','GMRest', '$modal'];
	
	function categoriaController($http, $rootScope, $scope, GMRest, $modal) 
	{

		var vm = this;
		vm.teste = "abc";
		
		vm.categoria = {
			id:null,
			nome:null,
			id_pai:null
		};

		vm.ctrlModal = {
			 addFilho: false
			,registro: vm.categoria
			,excluir: function (id){

						var idPai = vm.ctrlModal.filhos[0].id_pai;
						
						// exclui as modalidades
						GMRest.excluir("modalidade_categoria",{"id_categoria":id});

						// exclui a categoria (filho)
						GMRest.excluir("categoria",{"id":id});//.success(function(response){

						// atualiza a lista após a exclusão
				    	GMRest.consultarFilhos('categoria',idPai).success(function(response){
				    		vm.ctrlModal.filhos = response;
				    	});

					  }
			,salvar:	function(idPai){
						
							var dados = {
								nome  : this.emEdicao.nome,
								id_pai: idPai
							}

							// insere os dados no BD
					        GMRest.inserir('categoria',dados); //.success(function(response){

					    	// atualiza a lista de filhos após inserir
					        vm.ctrlModal.listarFilhos({id:idPai});

				    		// limpa os dados do formulário
					        vm.ctrlModal.emEdicao = null;

						}
			,alterar:	function(dados){

							GMRest.alterar("categoria",dados);

					    	// atualiza a lista de filhos após inserir
					    	GMRest.consultarFilhos('categoria',dados.id_pai).success(function(response){
					    		
					    		vm.ctrlModal.filhos = response;
					    		
					    		// limpa os dados do formulário
					    		vm.ctrlModal.emEdicao = null;
					    	});
						}
			,filhos: null
			
		    ,modalidadesCategoria: [] // serve para guardar os valores do checkbox de modalidade
			,listarFilhos: function(dados){
		    	GMRest.consultarFilhos('categoria',dados.id).success(function(filhos){
		    		vm.ctrlModal.filhos = filhos;

		    		// consultar as modalidades de cada categoria
		    		var id_categoria = null;

		    		console.clear();
		    		
		    		for(var i in filhos){
			    		
			    		// inicializa o array para cada categoria
			    		vm.ctrlModal.modalidadesCategoria[filhos[i].id] = [];

				    	// recupera as modalidades de cada filho (categoria)
				    	GMRest.consultar("modalidade_categoria",["id_categoria = "+filhos[i].id]).success(function(mc){
				    		for(var j in mc){
				    			//console.log(mc[0]);
				    			vm.ctrlModal.modalidadesCategoria[mc[j].id_categoria][mc[j].id_modalidade] = true;
				    		}
				    	});
		    		}

		    		//console.log(vm.ctrlModal.modalidadesCategoria);
		    	});
		    }
		    ,listarModalidades: function(){
		    	GMRest.consultar("modalidade").success(function(response){
		    		vm.ctrlModal.modalidades = response;
		    	});
		    }
		    ,salvarModalidade: function(filho,modalidade){
		    	if (!vm.ctrlModal.modalidadesCategoria[filho][modalidade]){
		    		GMRest.inserir("modalidade_categoria",{id_modalidade:modalidade,id_categoria:filho});
		    	} else {
	    		    GMRest.excluir('modalidade_categoria',{id_modalidade:modalidade,id_categoria:filho});
	    		}
		    }

		};

		vm.consultar = function(){
			GMRest.consultar('categoria',["id_pai is null"]).success(function(response){
				vm.categorias = response;
			});
		};
		vm.consultar();

	    // abre uma modal
	    vm.open = function(dados){
	    	if (dados){
	    		vm.ctrlModal.listarFilhos(dados);
	    		vm.ctrlModal.listarModalidades();
	    	}
	    	
	    	$scope.$broadcast('modal_categoria', dados);
	    }

	    vm.excluir = function(categoria){
	        GMRest.excluir('categoria',{id:categoria.id});
	        vm.consultar();
	    }


 // modal opening condition
  $scope.openConfirm = function(index) {
  	// Temporarily store data while waiting user confirmation
  	// This data will be used after confirmation to call WS
    // [...]
    $scope.index = index;
  	$scope.openConfirmation = true;
  };  


	}; //function categoriaController

})(angular);