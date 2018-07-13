var express = require("express");
var app = express();
var path = require("path");
var url  = require("url");
var fs=require("fs");

app.get("/", function (req, res){	
	res.send("hello world!");
})

app.use( express.static('./'));

var server = app.listen(6001, "127.0.0.1", function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
})//
