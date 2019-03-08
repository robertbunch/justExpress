const path = require('path')

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')

const helmet = require('helmet');
app.use(helmet())

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, 'views'))

app.use((req, res, next)=>{
    if(req.query.msg === 'fail'){
        res.locals.msg = `Sorry. This username and password combinatino does not exist.`
    }else{
        res.locals.msg = ``
    }

    // Send me on to the next piece of middleware!
    next()
})

app.get('/',(req, res, next)=>{
    res.send("Sanity Check")
})

app.get('/login', (req, res, next)=>{
    // the req object has a query property in Express
    // req.query is an object, wiht a property of every key in the query string
    // The query string is where you put insecure data
    // console.log(req.query)
    const msg = req.query.msg;
    if(msg === 'fail'){
        //run some other function...
    }
    res.render('login')
})

app.post('/process_login',(req, res, next)=>{
    // req.body is made by urlencoded, which parses the http message for sent data!
    const password = req.body.password;
    const username = req.body.username;
    // check the db to see if user credentials are valid
    // if they are valid...
        // - save their username in a cookie    
        // - is send them to the welcome page
    if(password === "x"){
        // res.cookie takes 2 args:
        // 1. name of the cookie
        // 2. value to set it to 
        res.cookie('username',username)
        // res.redirect takes 1 arg:
        // 1. Where to send the brower
        res.redirect('/welcome')
    }else{
        // The "?" is a special character in a URL
        res.redirect('/login?msg=fail&test=hello')
    }
    // res.json(req.body)
})

app.get('/welcome',(req, res, next)=>{
    // req.cookies object will have a property for every named cookie
    // that has been set.
    res.render('welcome',{
        username: req.cookies.username
    })
})

// app.param() - takes 2 args:
// 1. param to look for in the route
// 2. the callback to run (with the usuals)
app.param('id',(req, res, next, id)=>{
    console.log("Params called:" ,id);
    // if id has something to do with stories...
    // if id has something to do with blog...
    next();
})

// app.get('/user/:uid',...)
// app.get('/user/admin/:uid',...)
// app.get('/user/profile/:uid',...)

// in a route, anytime something has a : in front it is a wildcard!
// wildcard, will match anything in that slot
app.get('/story/:id',(req, res, next)=>{
    // the req.params object always exists
    // it will have a property for each wildcard in the route
    res.send(`<h1>Story ${req.params.storyId}</h1>`)
    // res.send('<h1>Story 1</h1>')
})


// THIS WILL NEVER RUN, because it matches above (without next())
// app.get('/story/:blogId',(req, res, next)=>{
//     // the req.params object always exists
//     // it will have a property for each wildcard in the route
//     res.send(`<h1>Story ${req.params.storyId}</h1>`)
//     // res.send('<h1>Story 1</h1>')
// })

app.get('/story/:storyId/:link',(req, res, next)=>{
    // the req.params object always exists
    // it will have a property for each wildcard in the route
    res.send(`<h1>Story ${req.params.storyId} - ${req.params.link}</h1>`)
    // res.send('<h1>Story 1</h1>')
})

// app.get('/story/1',(req, res, next)=>{
//     res.send('<h1>Story 1</h1>')
// })

// app.get('/story/2',(req, res, next)=>{
//     res.send('<h1>Story 2</h1>')
// })

// app.get('/story/3',(req, res, next)=>{
//     res.send('<h1>Story 3</h1>')
// })

app.get('/statement',(req, res, next)=>{
    // hand off the file to the right user
    // res.download - takes 3 args:
    // 1. path
    // 2. what you want to call the file when the user gets it (optional)
    // 3. callback (which accepts an error)
    const date = new Date();
    // download will load in the window!
    res.download(path.join(__dirname, 'userStatements/BankStatementChequing.png'),'jimsStatement.png',(err)=>{
        console.log(err);
    })    
    // sendFile will load in the browser!
    // res.sendFile(path.join(__dirname, 'userStatements/BankStatementChequing.png'),'jimsStatement.png')
    // res.attachment takes 1 arg:
    // 1. filename.
    // all attachment does it set up the headers. It wont actually send the file.
    // res.attachment(path.join(__dirname, 'userStatements/BankStatementChequing.png'))

})

app.get('/logout',(req, res, next)=>{
    // res.clearCookie takes 1 arg: 
    // 1. Cookie to clear (by name)
    res.clearCookie('username');
    res.redirect('/login')
})

app.listen(3000)
console.log("Server listening on port 3000...")