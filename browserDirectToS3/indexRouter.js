const express = require('express')
const router = express.Router() //get the Router class and make an object
const mime = require('mime-types')
const getS3PutLink = require('./getS3PutLink')
const getS3SignedLink = require('./getS3SignedLink')

router.post('/get-put-link',async(req, res)=>{
    //this routes job is to decide...
    // 1. can the user upload this file
        //in this example, anyone can upload anything
    // 2. if so, ask AWS for a put link that can upload from the browser
    // 3. send that link back, or let the user know there was an error
    // please GATE this in production... don't pay for the Internet to host its files on your S3 bucket
    const { fileName, fileSize, fileType } = req.body
    //make a unique key name for the file
    //use the timestamp for the upload
    //encodeURIComponent makes the name url safe, for instance, " " becomes %20
    const uniqueKeyName = `${Date.now().toString()}-${encodeURIComponent(fileName)}`
    //MAKE SURE you have the right mimeType. It caused me a lot of pain...
    const mimeType = mime.lookup(fileName)
    //call getS3PutLink and send it our uniqueFileName and bucket
    const signedLink = await getS3PutLink(uniqueKeyName,mimeType) //using default region and bucket, see function siganture!
    //Express now sends back the link and waits for confirmtion of upload
    res.json({
        signedLink,
        mimeType,
        uniqueKeyName
    })
})

router.post('/finalize-upload',(req, res)=>{
    const { key } = req.body
    //do all the stuff in here, that needs to happen once Express 
    //knows that the upload was successful

    const signedLink = getS3SignedLink(key)
    res.json(signedLink)
})

router.get('/test',(req, res)=>{
    res.json("Test")
})

module.exports = router