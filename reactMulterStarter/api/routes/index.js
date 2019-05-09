var express = require('express');
var router = express.Router();
const fs = require('fs');
const multer  = require('multer')
const upload = multer({ dest: 'public/images/uploads' })

router.post('/uploadFile', function(req, res, next) {
  res.json(req.file);
});

router.post('/uploadFiles', function(req, res, next) {
  res.json(req.files);
});

module.exports = router;
