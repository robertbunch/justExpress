var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // const date = new Date(1969,6,20);
  // res.set('Date',date)
  // res.set('Cache-Control','no-store')
  // res.set('Content-Type','text/html')
  // res.type('text/html')
  // fresh and stale
  // fresh returns true if it's not stale
  // console.log(req.fresh)
  // console.log(req.stale)
  console.log(req.accepts(['json','html']))
  res.render('index', { title: 'Express' });
});

module.exports = router;
