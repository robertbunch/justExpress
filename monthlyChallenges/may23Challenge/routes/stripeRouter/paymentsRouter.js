const express = require('express');
const router = express.Router();
// #subXXXRouter is always going to start with the base path of the index router

//BASE ROUTE = /stripe
//This router path is /payments
//full path to everything in this router: /stripe/payments

router.get('/',(req, res)=>{
    res.json("Home payments")
})

router.get('/make-payment',(req, res)=>{
    res.json("This is the /make-payment page")
})

router.get('/cancel-payment',(req, res)=>{
    res.json("This is the /cancel-payment page")
})

module.exports = router;