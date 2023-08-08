const fs = require('fs') //node file system
const https = require('https') //node https module
const express = require('express')
const app = express();

//we need a key and cert to run https
//we generate them with mkcert
// $ mkcert create-ca 
// $ mkcert create-cert 

//these lines create cert.key and cert.crt
//read in the cert files
const key = fs.readFileSync('./certs/cert.key')
const cert = fs.readFileSync('./certs/cert.crt')
const options = {
    key,
    cert
}

const secureExpressServer = https.createServer(options,app)

app.get('/test',(req, res)=>{
    res.json("test page")
})

secureExpressServer.listen(3000)