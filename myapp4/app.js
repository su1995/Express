var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.engine("html",require("ejs").__express);
app.engine("html",require("ejs").renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname,'public/blog')));


var multer = require('multer');
var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("blog");
  var myobj = [
    { name: "测试字段1", url: "testOne" , type: "lang"},
    { name: "测试字段2", url: "testTwo" , type: "lang"},
    { name: "测试字段3", url: "testFour" , type: "en"},
    { name: "测试字段4", url: "testFour" , type: "en"},
    { name: "测试字段5", url: "testTive" , type: "en"}
  ];
  //增  单条 insertOne 多条 insertMany 参数 文档数据 以及 钩子
  dbo.collection("site").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("集合site插入，测试记录插入四条成功");
      db.close();
  });
  //删 单条 deleteOne 多条 deleteMany 参数： 字段查询 以及 钩子
  // var whereStr1 = { name : "测试字段1" };
  // var whereStr2 = { type : "en", url: "testFour"};
  // dbo.collection("site").deleteMany(whereStr2, function(err, res) {
  //   if (err) throw err;
  //   console.log("集合site记录删除，测试记录3删除成功");
  //   db.close();
  // });
  // //查 find参数中放查询条件 json
  // var findwhereStr = {type: "en"};
  // dbo.collection("site").find(findwhereStr).toArray(function(err,res){
  //   if(err) throw err;
  //   console.log(res);
  //   db.close();
  // });

  // dbo.collection("test").insertMany(myobj, function(err, res) {
  //     if (err) throw err;
  //     console.log("集合site插入，测试记录插入四条成功");
  //     db.close();
  // });
  //drop 删除数据表
  // dbo.collection("test").drop(function(err, delOK){
  //   console.log("yesy we come");
  //   if(err) throw err;
  //   if(delOK){
  //     console.log(delOK);    
  //   }
  //   db.close();      
  // });
});

// // 下边这里也加上 use(multer())
// // app.use(require('body-parser').urlencoded({extended: true}))
// app.use(multer());
// app.use(cookieParser());

// var session = require('express-session');

// var app = express();
// app.use(session({ 
//     secret: 'secret',
//     cookie:{ 
//         maxAge: 1000*60*30
//     }
// }));

// app.use(function(req,res,next){ 
//     res.locals.user = req.session.user;   // 从session 获取 user对象
//     var err = req.session.error;   //获取错误信息
//     delete req.session.error;
//     res.locals.message = "";   // 展示的信息 message
//     if(err){ 
//         res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
//     }
//     next();  //中间件传递
// });

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  //res.header("X-Powered-By",' 3.2.1')
  //res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use('/', indexRouter);
app.use('/others', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
