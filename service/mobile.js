var logger = process.logger.accessLog; /*日志抛出给下面的rooter使用*/ 
/*验证是无线还是pc*/
var judgeMobile = function(req){
    var deviceAgent = req.headers['user-agent'].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID){
        return true;
    }else{
        return false;
    }
};

module.exports = judgeMobile;