/*
* 这是cattle的入口文件
*/
var express = require('express'),
    app = express(),
    favicon = require('serve-favicon'),
    path = require('path'), 
    fs = require('fs'), 
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    setting = require('./' + 'setting'),
    route = require('./' + 'route'),
    logger = require('./service/' + 'logger');  
var multipart = require('connect-multiparty');
app.use(multipart());
require('./' + 'model');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*使用日志模块log4js进行access日志的接收*/
logger.use(app);
app.use(route());
/*数据模型注入，放入process中作为数据模型使用*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(setting.port?setting.port:80);
