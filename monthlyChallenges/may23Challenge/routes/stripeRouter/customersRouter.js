const express = require('express');
const router = express.Router();
// #subXXXRouter is always going to start with the base path of the index router

//BASE ROUTE = /stripe
//This router path is /customers
//full path to everything in this router: /stripe/customers

router.get('/get-customer',(req, res)=>{
    res.json("This is the /get-customer page")
})

module.exports = router;