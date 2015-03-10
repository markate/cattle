var fis = require("fis");
var underScore = require("underscore");
var keyClear = [""];

/*利用模版系统进行模版解析*/
var template = function(file,conf){
    var fileInstance  = fis.file.wrap(file),
        fileString = fileInstance.toString();
    var compile = underScore.template(fileString);
    return compile(conf)
};

/*获取配置文件中的替换信息*/
var templateConfInit = function(){
    var conf = require("../../model/resource.js");
    console.log(conf);

};

templateConfInit();
