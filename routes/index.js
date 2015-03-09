var express = require('express');
var router = express.Router();
var logger = process.logger.logger; /*日志抛出给下面的rooter使用*/ 

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: '首页测试' });
});

module.exports = router;
