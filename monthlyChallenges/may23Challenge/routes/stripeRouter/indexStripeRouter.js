const express = require('express');
const router = express.Router();
// #indexXXXRouter is always the in charge router of the sub routers

//BASE ROUTE = /stripe
const customerRouter = require('./customersRouter')
const payementsRouter = require('./paymentsRouter')
router.use('/customers',customerRouter)
router.use('/payments',payementsRouter)

router.get('/',(req, res)=>{
    res.json("This is the /stripe page")
})

module.exports = router;