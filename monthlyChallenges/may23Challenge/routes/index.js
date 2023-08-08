var express = require('express');
var router = express.Router();
const indexStripeRouter = require('./stripeRouter/indexStripeRouter')
const indexUsersRouter = require('./usersRouter/indexUsersRouter')

//everyting inside of indexStripeRouter, will start with /stripe
router.use('/stripe',indexStripeRouter);
//everyting inside of indexUsersRouter, will start with /users
router.use('/users',indexUsersRouter);

module.exports = router;
