var logger = process.logger.accessLog; /*日志抛出给下面的rooter使用*/ 
var setting = require('../' + 'setting');
var ALY = require('aliyun-sdk');
/*上传文件*/
var fetchFileStream = function(key,callback,errorCallback){
   
    /*初始化阿里云文件上传类*/
    var oss = new ALY.OSS({
        accessKeyId: setting.accKey,
        secretAccessKey: setting.Secret,
        endpoint: setting.aliyunFileServer,
        apiVersion: '2013-10-15'
    });
    /*获取文件*/
    oss.getObject({
        Bucket: setting.bucket,
        Key: key
    },
    function (err, data) {
        if(err){
            logger.info(err);
            errorCallback && errorCallback();
        }else{
            callback(data);
        }
    });
};
module.exports = fetchFileStream;