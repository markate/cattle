var fs = require('fs');
/*扫描Action*/
var router = function(callback){
    var files = fs.readdirSync("./action/"),routes=[];
    for (var i = 0;i<files.length;i++){
        routes.push(routeInject(files[i]));
    }
    return  routes;
};
/*将路由注入*/
var routeInject = function(action){
    var express = require('express'),
        route = express.Router(),
        actionFun = require("./action/" + action),
        urlRouter = action.substr(0,action.lastIndexOf("Action.js"));
        urlRouter = (urlRouter == "index"?"":urlRouter); /*首页是indexAction*/
    route.get("/" + urlRouter,function(req,res,next){
        if(typeof(actionFun) == "function"){
            actionFun({ 
                res:res,
                req:req,
                next:next
            });
        }
    });
    route.post("/" + urlRouter,function(req,res,next){
        if(typeof(actionFun) == "function"){
            actionFun({ 
                res:res,
                req:req,
                next:next
            });
        }
    });
    return route;
};

module.exports = router;