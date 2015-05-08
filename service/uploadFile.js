var logger = process.logger.accessLog; /*日志抛出给下面的rooter使用*/ 
var setting = require('../' + 'setting');
var ALY = require('aliyun-sdk');
var fs = require('fs');
var formidable = require('formidable');
/*上传文件*/
var uploadFile = function(file,res,callback){
     /*获取文件后缀*/
    var getFileExtension = function(fileName){
        var fileArray = fileName.split(".");
        if(fileArray.length > 1){
            return "." + fileArray[fileArray.length-1];
        }else{
            return "";
        }
    };
    /*生成随机文件名，由于是单线程模式，所以不会有问题*/
    var preFile = file.name?file.name:file.originalFilename;
    var fileName = (new Date()).getTime()+ '' +Math.random()*10000 + getFileExtension(preFile); 
    /*初始化阿里云文件上传类*/
    var oss = new ALY.OSS({
        accessKeyId: setting.accKey,
        secretAccessKey: setting.Secret,
        endpoint: setting.aliyunFileServer,
        apiVersion: '2013-10-15'
    });
    fs.readFile(file.path, function (err, content) {
            /*上传文件*/
        oss.putObject({
            Bucket: 'markate',
            Key: fileName,
            Body: content,
            AccessControlAllowOrigin: '*',
            ContentType: 'text/plain',
            CacheControl: 'no-cache',         
            ContentDisposition: '',           
            ContentEncoding: 'utf-8',         
            ServerSideEncryption: 'AES256',
            Expires: new Date()                       
        },
        function (err, data) {
            if (err) {
                res.send({error_no:1});
                console.log('error:', err);
                return;
            }
            callback({data:data,fileName:fileName});
        });
    });
};
module.exports = uploadFile;