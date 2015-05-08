var logger = process.logger.accessLog; /*日志抛出给下面的rooter使用*/ 
var isMobile = require('../service/' + 'mobile' );
var Images = process.models['image'];
var indexAction = function(arg){
    var res = arg.res;
    var req = arg.req;
    /*后面从数据库接入*/
    Images.find({}, function (err,imageObject) {
        logger.info(imageObject);
        if (isMobile(req)) {
            res.render('mobile/index', { title: '首页',imageObject:imageObject});
        }else{
            res.render('pc/index', { title: '首页' ,imageObject:imageObject});
        }
    });
  
};
module.exports = indexAction;