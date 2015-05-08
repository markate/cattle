var fs = require('fs');
var logger = process.logger.logger; /*日志抛出给下面的rooter使用*/
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/fuxiang');
/*扫描Action*/
var files = fs.readdirSync("./model/"),data,fileName,models={};
for (var i = 0;i<files.length;i++){
    fileName = files[i].substring(0,files[i].length-3);
    data = require("./model/" + fileName);
    models[fileName] = db.model(fileName,new mongoose.Schema(data));
}
process.dbConn = db;
process.models = models; 
module.exports = models; 