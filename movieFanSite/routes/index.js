var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req, res, next)=>{
  res.locals.imageBaseUrl = imageBaseUrl;
  next()
})

/* GET home page. */
router.get('/', function(req, res, next) {
  // request.get takes 2 args:
  // 1. it takes the URL to http "get"
  // 2. the callback to run when the http response is back. 3 args:
  //   1. error (if any)
  //   2. http response
  //   3. json/data the server sent back
  request.get(nowPlayingUrl,(error, response, movieData)=>{
    // console.log("========The error========")
    // console.log(error)
    // console.log("========The response========")
    // console.log(response)
    // console.log(movieData)
    const parsedData = JSON.parse(movieData)
    // res.json(parsedData)
    res.render('index',{
      parsedData: parsedData.results,
    })
  })
});

module.exports = router;
