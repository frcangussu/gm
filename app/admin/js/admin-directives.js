(function (angular, undefined) {

    'use strict';

    angular.module('adminDirectives',[])

    .directive('menuLateral', function () {
        return {
            scope: { itens: "=itens" },
            restrict : 'E', // Elemento
            link : function (scope, element, attrs, ctrl) { },
            controller: function ($scope,$location){

                // recupera o menu ativo a partir da URL
                $scope.menuAtivo = $location.$$path.split("/")[1];

                $scope.navegar = function (path){
                    $scope.menuAtivo = path;
                    $location.path(path);
                };

            },

            templateUrl: 'tpl/menuLateral.html'
        };
    })

    .directive('modal', function () {
        return {
            restrict : 'E', // Elemento
            transclude : true,
            scope: {
                 tabela: "@"
                ,titulo: "@"
                ,idModal: "@"
                ,atualizar: "=atualizar"
                ,tpl: "@"
                ,dados: "=dados" 
                ,ctrl: "=ctrl"
            },
            templateUrl: '/gm/tpl/modal.html',
            link : function (scope, element, attrs, ctrl) { },
            controller: function ($scope,$modal){

                $scope.$on('modal_'+$scope.tabela, function(event,objEmEdicao) { 

                    var modalInstance = $modal.open({
                        templateUrl: "add_modal",
                        controller: $scope.modalCtrl,
                        resolve:{
                                    conteudo: function() {
                                        return {
                                            registro:  objEmEdicao,
                                            tabela:    $scope.tabela,
                                            titulo:    $scope.titulo,
                                            idModal:   $scope.idModal,
                                            atualizar: $scope.atualizar,
                                            tpl:       $scope.tpl,
                                            ctrl:      $scope.ctrl
                                        };
                                    }
                                }
                    });
                });

                var tabela = $scope.tabela;

                $scope.modalCtrl = function($scope, $modalInstance, GMRest, conteudo) {

                    $scope.buttonDisabled = false;
                    
                    $scope.desabilitarBotoes = function(){
                        $scope.buttonDisabled = true;
                    };
                    $scope.habilitarBotoes = function(){
                        $scope.buttonDisabled = false;
                    };

                    $scope.tpl      = conteudo.tpl;
                    $scope.idModal  = conteudo.idModal;
                    $scope.tabela   = conteudo.tabela;
                    $scope.titulo   = conteudo.titulo;
                    $scope.ctrl     = conteudo.ctrl;
                    $scope.registro = {};
                    $scope.alerts   = [];         // array of alert message objects.

                    // if clicked edit. id comes from $scope.modal->userId
                    if (angular.isDefined(conteudo.registro)) {
                        $scope.registro = conteudo.registro;
                    } 

                    // close modal
                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.add = function() {
                        GMRest.inserir($scope.tabela,$scope.registro);
                        conteudo.atualizar();
                        $modalInstance.dismiss('cancel');
                    };

                    // Save edited user.
                    $scope.save = function() {

                        // remove elementos vazios
                        var dados = FWUtils.arrayTrim($scope.registro);

                        GMRest.alterar($scope.tabela,dados);
                        conteudo.atualizar();
                        $modalInstance.dismiss('cancel');
                    };
                };

            }

        };
    })

    ;

})(angular);