define([
], function () {
    angular.module('platform').register.directive('createProject',
        ["$http","$location",function ($http,$location) {
            return {
                restrict: 'E', 
                templateUrl: '/platform/directives/createProject.html',
                replace: true,
                link: function($scope, $elem, $attrs) {
                    var url = "http://cp01-rdqa04-dev111.cp01.baidu.com:8000/addProject";
                    /*初始时*/
					$scope.createDisplay = false;
                    $scope.createFormData = {};
                 
                    $scope.closeProjectWindow = function(){
                       $scope.createDisplay = false; 
                    };
                    /*获取参数值*/

                    function getUrlParam(name) {
                        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                        if (r != null) return unescape(r[2]); return null; //返回参数值
                    }

                    console.log(getUrlParam("pid"));
                    /*创建项目*/
                    $scope.createAction = function(){
                        $scope.createFormData.owner = $scope.loginName;
                        $scope.createFormData.status = 0;
                        $scope.createFormData.id =(new Date()).getTime();
                        $http({
                            method: 'get',
                            url:url+"?"+$.param($scope.createFormData)
                        }).
                        success(function(data, status, headers, config) {
                           if(data && data["error_no"] == 0){
                                if(angular.isArray($scope.projectList)){
                                    $scope.projectList.push($scope.createFormData);
                                }
                                $scope.createFormData = {
                                    owner:$scope.loginName,
                                    status:0
                                };   
                                 $scope.createDisplay = false; 
                           }else{
                                alert("异常错误");
                           }
                        }).
                        error(function(data, status, headers, config) {
                            alert("网络错误");
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });
                        
                        /*---*/
                    };
                }
            };
        }]
    );
});
