(function (angular, undefined) {

    'use strict';

    angular.module('layoutDirectives',[])

    .directive ('logo', function(){
        return {
            scope: {},
            restrict: 'E',
            link: function (scope, element, attrs, ctrl){},
            template: '<div class="logo">'+
                            '<a href="www.jardinsmangueiral.com.br">'+
                                '<img src="/gm/img/themes/CZSale/czsale_logo.png">'+
                            '</a>'+
                        '</div>'
        };
    })

    .directive('menu', function () {
        return {
            scope: { ctrl: "=ctrl" },
            restrict : 'E', // Elemento
            link : function (scope, element, attrs, ctrl) {},
            templateUrl: '/gm/tpl/menu.html'
        };
    })

    .directive ('search', function(){
        return {
            scope: {},
            restrict: 'E',
            link: function (scope, element, attrs, ctrl){},
            template: //'<h4>Search: {{ct.search}}</h4>'+
                      '<div class="well well-sm">'+
                        '<form>'+
                          '<fieldset>'+
                            '<input class="form-control" type="text" data-ng-model="ctrl.search" placeholder="Pesquisar" fw-focus-me="focoPesquisar">'+
                            '<small><a href="#" class="btn-advanced-search">Pesquisa Avançada</a></small>'+
                            '<input class="btn btn-info btn-sm btn-search" value="Search" type="submit">'+
                          '</fieldset>'+
                        '</form>'+
                      '</div>'
        };
    })

    .directive('categories', function () {
        return {
            scope: { value: "=value" },
            restrict : 'E', // Elemento
            link : function (scope, element, attrs, ctrl) {},
            templateUrl: '/gm/tpl/categories.html'
        };
    })

    .directive('newest', function () {
        return {
            scope: { },
            restrict : 'E', // Elemento
            link : function (scope, element, attrs, ctrl) {},
            templateUrl: '/gm/tpl/newest.html'
        };
    })

    .directive('featured', function () {
        return {
            scope: { },
            restrict : 'E', // Elemento
            link : function (scope, element, attrs, ctrl) {},
            templateUrl: '/gm/tpl/featured.html'
        };
    })

    .directive('recomended', function () {
        return {
            scope: { },
            restrict : 'E', // Elemento
            link : function (scope, element, attrs, ctrl) {},
            templateUrl: '/gm/tpl/recomended.html'
        };
    })

    ;

})(angular);
