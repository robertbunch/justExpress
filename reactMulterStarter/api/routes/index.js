var express = require('express');
var router = express.Router();
const fs = require('fs');
const multer  = require('multer')
const upload = multer({ dest: 'public/images/uploads' })

/* GET home page. */
router.get('/uploadFile', function(req, res, next) {
  res.json(req.file);
});

router.get('/uploadFiles', function(req, res, next) {
  res.json(req.files);
});

module.exports = router;
