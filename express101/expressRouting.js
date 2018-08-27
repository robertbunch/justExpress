const express = require('express');
const app = express();

// app object has a few methods:
// HTTP verbs! REST verbs!
// CRUD app cooresponence!
// 1. get - READ
// - DEFAULT for all browsers is get. 
// 2. post - CREATE
// 3. delete - DELETE
// 4. put - UPDATE
// 5. all - i will accept any method

// Take 2 args:
// 1. path
// 2. callback to run if an HTTP request that matchs THIS verb
// is made to the path in #1
// app.all('/',(req,res)=>{
//     res.send(`<h1>Welcome to the home page!`)
// })

app.get('/',(req, res)=>{
    console.log(req)
    res.send(`<h1>Welcome to the home GET page!`)
})
app.post('/',(req, res)=>{
    res.send(`<h1>Welcome to the home POST page!`)
})
app.delete('/',(req, res)=>{

})
app.put('/',(req, res)=>{

})

app.listen(3000)
console.log("The server is listening on port 3000...")