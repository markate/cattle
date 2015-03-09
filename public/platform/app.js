/**
 *   by suhongtang  
 *   angular的controller路由机制，异步获取controller
 */
require([], function () {
    var moudle = angular.module('platform', [
        //angular的resource与路由支持
        'ngRoute',
        'ngCommon'
    ]);
    // 路由配置
    moudle.config([
        '$routeProvider',
        'routeResolverProvider',
        function ($routeProvider, routeResolverProvider) {
            // 使用route来进行异步加载controller的路由配置
            var route = routeResolverProvider.route;
             $routeProvider.when('/index', route.resolve({
                        templateUrl: '/platform/template/platform.html',
                        controllerUrl: '/platform/template/platform.js'
                    })).when('/note', route.resolve({
                        templateUrl: '/platform/template/note.html',
                        controllerUrl: '/platform/template/note.js'
                    })).when('/logView', route.resolve({
                        templateUrl: '/platform/template/logView.html',
                        controllerUrl: '/platform/template/logView.js'
                     })).when('/autoTest', route.resolve({
                        templateUrl: '/platform/template/autoTest.html',
                        controllerUrl: '/platform/template/autoTest.js'
                    })).otherwise({ redirectTo: '/index' });
        }
    ]);
    // 生成供异步文件注册使用的register
    angular.module('ngCommon').setupRegister(moudle);
    // bootstrap
    angular.bootstrap(document, [moudle.name]);

});


