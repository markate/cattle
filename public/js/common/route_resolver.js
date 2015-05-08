/**
 * Dynamically Loading Controllers and Views with AngularJS and RequireJS
 * @see http://weblogs.asp.net/dwahlin/archive/2013/05/22/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs.aspx
 * @author lvsheng, Modified by Lurker
 */
require([], function () {
    var services = angular.module('ngCommon');

    /**
     * setup controller register to the module
     * @param module
     */
    services.setupRegister = function (module) {
        module.config([
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                module.register = {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service,
                    value: $provide.value,
                    constant: $provide.constant
                };
            }
        ]);
    };

    /**
     * Route Resolver, to generate route config.
     */
    services.provider('routeResolver', function () {
        this.$get = function () {
            return this;
        };

        this.route = (function () {
            /**
             * generate dynamically route config
             * @param {Object} config
             * @param {String} config.templateUrl The template url you will load
             * @param {String} config.controllerUrl The controller url you will load
             * @returns {{templateUrl: (String|*), resolve: {load: *[]}}}
             */
            function resolve  (config) {
                return {
                    templateUrl   : config.templateUrl,
                    resolve       : {
                        load: ['$q', '$rootScope', function ($q, $rootScope) {
                            var dependencies = [config.controllerUrl];
                            return resolveDependencies($q, $rootScope, dependencies);
                        }]
                    }
                };
            }

            function resolveDependencies  ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply();
                });

                return defer.promise;
            }

            return {
                resolve: resolve
            }
        })();
    });
});

