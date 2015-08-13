'use strict';

angular.module('GMAdminApp', [
     'ngRoute'
    ,'fwConfigs'
    ,'gmServices'
    ,'gmDirectives'
    ,'layoutDirectives'
    ,'fwDirectives'
    ,'fwConstants'
    ,'adminDirectives'
    ,'moduloAdminController'
    ,'moduloCategoria'
    ,'moduloUsuario'
    ,'moduloGenerate'
    ,'ui.bootstrap'
])

.config([ '$routeProvider',
    function ($routeProvider) {
        $routeProvider
        .when('/categoria', {
            templateUrl: 'categoria/categoria.tpl.html',
            controller: 'categoriaController',
            controllerAs: 'cCat'
        })
        .when('/generate',{
            templateUrl: 'generate/generate.html',
            controller:"generateController",
            controllerAs: 'cGen'
        })
        .when('/usuario',{
            templateUrl: 'usuario/usuario-cadastro.tpl.html',
            controller:"usuarioController",
            controllerAs: 'cUsu'
        })
        .otherwise({
            redirectTo: '/categoria'
        })

        ;


        // $rootScope.$watch("$routeChangeSuccess", function(){
        // 	console.clear();
        // 	console.log(">>> $location: ");
        // 	console.log($location);
        // }, true);
    }]
)

.run(['$route', function ($route) {
    //console.debug('miv-app.js:run');
}]).run(['$route', angular.noop]);