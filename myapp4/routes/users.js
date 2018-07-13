var express = require('express');
var router = express.Router();

var data = {test: 123};

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("hi others/");
  res.send("hi !");
});

router.get('/boy', function(req, res, next) {
  console.log("hi users/");
  res.send("hi boy!");
});

module.exports = router;
