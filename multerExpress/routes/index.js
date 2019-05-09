var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({dest:"public/images/uploads"})
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/formsub',upload.single('meme'),(req, res, next)=>{
  // console.log(req.file);
  const newPath = `public/images/uploads/${req.file.originalname}${Date.now()}`;
  fs.rename(req.file.path, newPath, (err)=>{
    if(err) throw err;
    // upload newPath to the db
    res.json("file uploaded!")
  });
  
})

  router.post('/formsubarray',upload.array('meme'),(req, res, next)=>{
    console.log(req.files);
    const newPath = `public/images/uploads/${req.files[0].originalname}${Date.now()}`;
    const newPath2 = `public/images/uploads/${req.files[1].originalname}${Date.now()}`;
    fs.rename(req.file.path, newPath, (err)=>{
      if(err) throw err;
      // upload newPath to the db
      res.json("file uploaded!")
    });
  })

  router.post('/formsubarray',upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 8 }
  ]),(req, res, next)=>{
    console.log(req.files);
    const newPath = `public/images/uploads/${req.files[0].originalname}${Date.now()}`;
    const newPath2 = `public/images/uploads/${req.files[1].originalname}${Date.now()}`;
    fs.rename(req.file.path, newPath, (err)=>{
      if(err) throw err;
      // upload newPath to the db
      res.json("file uploaded!")
    });
  })

module.exports = router;
