define(["/platform/directives/createProject.js"], function () {
	angular.module('platform').register.controller('ProjectList', [
        '$scope',
        '$location',
        '$route',
        '$http',
         function ($scope, $location, $route,$http) {
         	/*标题*/
         	$scope.title = "Clouda团队辅助开发平台";
         	/*获取当前登陆用户名,待mis恢复后加入请求*/
			$scope.loginName = "";
            $scope.searchName = "";
			$http({withCredentials:true,method: 'get', url: 'http://bcmsmis.newoffline.bae.baidu.com/api/?method=getusername&_dc=' + (new Date()).getTime() +'&page=1&start=0&limit=25'}).
            success(function(data, status, headers, config) {
                if(data && data["response_params"]){
                   $scope.loginName = data["response_params"]["username"];
                   $scope.searchName = data["response_params"]["username"];
                }
            }).
            error(function(data, status, headers, config) {
                alert("获取用户名错误");
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });


			
			$scope.project = "";
			/*获取项目列表*/
			$http({method: 'get',data:{}, url: '/projectList'}).
            success(function(data, status, headers, config) {
                if(data && data["error_no"] == 0){
                   $scope.projectList = data["data"];
                }
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

            $scope.createPro = function(){
                $scope.createDisplay = true;
            };
        }
    ]);

});