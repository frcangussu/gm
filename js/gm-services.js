(function (angular, undefined) {
    'use strict';

    /* Services */
    angular.module('gmServices', [ 'ngResource' ])

    // declaração dos serviços
    .factory('GMRest',GMRest);

    GMRest.$inject = ['$rootScope','$http'];

    function GMRest($rootScope,$http){
    	
    	var factory = {};

        factory.consultar = function (tabela,where){
            if (where){
                where = encodeURIComponent(JSON.stringify(where));
                return $http.get("/gm/rest/consultar/"+tabela+"/"+where).success(function(response){ return response; });
            } else {
                return $http.get("/gm/rest/consultar/"+tabela).success(function(response){ return response; });
            }
        }
        
        factory.consultarFilhos = function (tabela,idPai){
            return $http.get("/gm/rest/consultarFilhos/"+tabela+"/"+idPai).success(function(response){
                return response;
            });
        }

        factory.alterar = function (tabela,dados){
            $http.post('/gm/rest/executar/alterar/'+tabela, dados).success(function(response){
                
                if (response){
                     $rootScope.mensagens.push({INFO:"Dados alterados com sucesso"});
                 }

            });

        }

        factory.inserir = function (tabela,dados){

            $http.post('/gm/rest/executar/inserir/'+tabela, dados).success(function(response){
                
                if (response){
                    $rootScope.messages.push({INFO:"Dados inseridos com sucesso"});
                }

                return response;

            });

        }

        factory.excluir = function (tabela,dados){

            $http.post('/gm/rest/executar/excluir/'+tabela, dados).success(function(response){
                
                if (response){
                    $rootScope.messages.push({INFO:"Dados removidos com sucesso"});
                }

            });

        }

        

    	return factory;
    }

})(angular);