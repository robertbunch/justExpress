const express = require('express');
let router = express.Router();

function validateUser(req, res, next){
    res.locals.validated = true;
    console.log("validated!")
    next();
}

// validateUser, is middleare that will ONLY be added to this router.
// In other words, the main router doesnt know about it
router.use(validateUser);

router.get('/',(req, res, next)=>{
    res.json({
        msg: "User Router works!!"
    })
})

module.exports = router;
