const express = require('express');
const router = express.Router();
// #indexXXXRouter is always the in charge router of the sub routers

//BASE ROUTE = /users
const authRouter = require('./authRouter')
const settingsRouter = require('./settingsRouter')
router.use('/auth',authRouter)
router.use('/settings',settingsRouter)

module.exports = router;