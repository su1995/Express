var express = require('express');
var router = express.Router();
// 增加url 依赖
var urllib = require('url');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log("here /");
  // res.send();
  // next();
  // res.sendfile('./public/blog/register.html'); 
  // res.sendfile('./views/index.html'); 
});


router.get('/users', function(req, res, next) {
  console.log("users get");
  var params = urllib.parse(req.url, true);
  var query = params.query;
  console.log(query);
  res.send({"sdsadas": 2334});
});


router.get('/login', function(req, res, next) {  
  console.log("blog login");
  var data_name = "xxx";
  res.render('login', {  });
});

router.post('/users', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  console.log("users post");
  var data = req.body;
  console.log(data);
  res.send({"sdsadas": 233});
});

router.get("/register", function(req, res , next){
  console.log("register get");
  res.render('register');    
});

router.post("/register", function(req, res , next){
  console.log("register post");
  var data = req.body;
  console.log(data);
  var myObj =data;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("blog");
    //增  单条 insertOne 多条 insertMany 参数 文档数据 以及 钩子
      dbo.collection("site").insertOne(myObj, function(err, res) {
        if (err) throw err;
        console.log("集合site插入，用户注册信息一条插入成功");
        console.log(myObj);
        db.close();
    });
  });
  res.send({"ok": true, "uname": myObj.uname});
});

router.get("/blogMain", function(req, res , next){
  console.log("main get");  
  // console.log(data);
  //res.body拿取用户数据 进行数据库查找 先user后pass步步查找比较 一致后返回博客主页
  var myObj;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("blog");
    //增  单条 insertOne 多条 insertMany 参数 文档数据 以及 钩子
      dbo.collection("site").find({uname: "tom"}).toArray(function(err, result) {
        if (err) throw err;
        console.log("集合site查询，用户信息tom一条查询成功");
        myObj = result;
        console.log(result);
        db.close();  
        if(myObj.length){
          res.render('blogMain', { uname: myObj[0].uname }); 
                   
        }else{
          res.send('没有找到用户数据！');
        }        
    });      
  });  
  console.log("lalaal");
  console.log(myObj);
});

router.post("/blogMain", function(req, res , next){
  console.log("main post");  
  // console.log(data);
  //req.body拿取用户数据 进行数据库查找 先user后pass步步查找比较 一致后返回博客主页
  var reqData = req.body;
  console.log(reqData);  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("blog");
    //增  单条 insertOne 多条 insertMany 参数 文档数据 以及 钩子
    dbo.collection("site").find({uname: reqData.unmae}).toArray(function(err, result) {
        if (err) throw err;
        console.log("集合site查询，用户信息tom一条查询成功");       
        console.log(result);
        db.close();  
        if(result.length){          
          // res.sendfile("./views/blogMain.html");
          // res.redirect('/users');   
          res.redirect('http://www.baidu.com');       
        }else{
          res.send({cnt:'没有找到用户数据！'});
        }        
    });      
  });  
  console.log("lalaal");  
});

module.exports = router;
