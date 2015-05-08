// /*
// *    这是cattle的日志模块，使用的是log4js
// */
var log4js = require('log4js');  
/*log4js配置日志模块*/
log4js.configure({  
    appenders: [  
        {  
            type: 'console',  
            category: "console"  
        }, //控制台输出  
        {  
            type: "dateFile",  
            filename: './log/accecc_log.log',  
            pattern: "_yyyy-MM-dd",  
            alwaysIncludePattern: false,  
            category: 'access_log'  
        },//日期文件格式
        {
            type: "dateFile",  
            filename: './log/warming_log.log',  
            pattern: "_yyyy-MM-dd",  
            alwaysIncludePattern: false,  
            category: 'warming_log',
            format:':method :url'  
        },
        {
            type: "dateFile",  
            filename: './log/error_log.log',  
            pattern: "_yyyy-MM-dd",  
            alwaysIncludePattern: false,  
            category: 'error_log'  
        }    
    ],  
    replaceConsole: true,   //替换console.log  
    levels:{   
        "access_log":'INFO',
        "warming_log":'INFO',
        "error_log":'INFO'
    }   
});  
var accessLog = log4js.getLogger('access_log');  
var warnLog = log4js.getLogger('warming_log');
var errorLog = log4js.getLogger('error_log');
var log = {
    accessLog:accessLog,
    warnLog:warnLog,
    errorLog:errorLog,
    use:function(app){ 
        app.use(log4js.connectLogger(accessLog, {level:log4js.levels.INFO, format:':method :url'}));  
    }
}; 
process.logger = log; 
module.exports = log;



