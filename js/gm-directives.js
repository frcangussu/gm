(function (angular, undefined) {

    'use strict';

    angular.module('gmDirectives',[])

    .directive('gmSelect', function (){
        return {
            restrict : 'E', // Elemento
            scope: {
                tableName: "@",
                showField: "@",
                width: "@",
                placeholder: "@",
                ngModel: "="
            },
            controller: function ($scope,GMRest){
                
                $scope.field = ($scope.showField) ? (!$scope.showField) : "display";

                GMRest.consultar($scope.tableName).success(function(response){
                    $scope.list = response;
                });

                $scope.selecionar = function (obj){
                    $scope.ngModel = obj;
                }
            },

            link : function (scope, element, attrs, ctrl) { },

            templateUrl: '/gm/tpl/one-select.tpl.html'

        };
    })

    ;

})(angular);
