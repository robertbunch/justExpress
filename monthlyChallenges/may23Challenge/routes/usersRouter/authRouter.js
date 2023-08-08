const express = require('express');
const router = express.Router();
// #subXXXRouter is always going to start with the base path of the index router

//BASE ROUTE = /users
//This router path is /auth
//full path to everything in this router: /users/auth

router.get('/login',(req, res)=>{
    res.json("This is the /login page")
})

module.exports = router;