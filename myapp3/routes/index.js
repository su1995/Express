var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/233', function(req, res, next) {
  res.render('test', { title: '23333' });
});

module.exports = router;
