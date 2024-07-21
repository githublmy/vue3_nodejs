var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入express-fileuplod
var fileUpload = require('express-fileupload');

// 引入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 引入文件操作路由
var filesRouter = require('./routes/file')
// const port = 3000
var app = express();

// 引用静态资源
app.use(express.static('uploads'))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));
// 使用express-fileupload中间件
app.use(fileUpload());

//设置跨域访问,必须放在路由上面
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method.toLowerCase() == 'options')
    res.sendStatus(200);  //让options尝试请求快速结束
  else
    next();
});
// 使用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 使用文件管理路由
app.use('/files', filesRouter)


// 处理404
app.use(function (req, res, next) {
  // next(createError(404));
  res.status(404).send({ status: 404, data: null })
});

// 错误处理
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // 渲染错误页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
