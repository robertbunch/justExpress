
const express = require('express') //we need to install it!
const app = express() //create an app
app.use(express.static('public')) //where our front-end lives
app.use(express.json()) //We need this to get req.body

const indexRouter = require('./indexRouter')

app.use(indexRouter) //this will apply it to * routes

app.listen('3000')
console.log("Listening on port 3000")
