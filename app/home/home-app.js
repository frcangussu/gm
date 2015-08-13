'use strict';

angular.module('GMApp', [
     'ngRoute'
    ,'fwConfigs'
    // ,'ngResource'
    // ,'ui.mask'
    // ,'sosConfigs'
    // ,'sosControllers'
    // ,'sosDirectives'
    // ,'sosFilters'
    // ,'sosServices'
    //'gmDirectives'
    ,'gmServices'
    ,'modalDirectives'
    ,'bannerDirectives'
    ,'layoutDirectives'
    // ,'fwServices',
    ,'moduloGMController'
    ,'ui.bootstrap'
    //,'DetalheChatController'
])

.config([ '$routeProvider',
    function ($routeProvider) {
        $routeProvider
        .when('/home', {
            templateUrl: 'app/home/home.tpl.html',
            controller: 'gmController',
            controllerAs: 'cHome'
        })
        .otherwise({
            redirectTo: '/home'
        });
    }]
)

.run(['$route', function ($route) {
    //console.debug('miv-app.js:run');
}]).run(['$route', angular.noop]);