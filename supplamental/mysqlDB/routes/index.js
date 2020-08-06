var express = require('express');
var router = express.Router();
const mysqlDb = require('../db/mysqlConn');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  const queryText= 'SELECT * FROM tasks WHERE id > ? AND taskName';
  mysqlDb.query(queryText,[3],(error,results)=>{
    res.json(results)
  })
});

module.exports = router;
