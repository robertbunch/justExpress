const express = require('express');
const router = express.Router();
// #subXXXRouter is always going to start with the base path of the index router

//BASE ROUTE = /users
//This router path is /settings
//full path to everything in this router: /users/settings

router.get('/change-name',(req, res)=>{
    res.json("This is the /change-name page")
})


router.get('/change-password',(req, res)=>{
    res.json("This is the /change-password page")
})

module.exports = router;