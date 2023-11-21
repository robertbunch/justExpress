//this file generates a put link for the browser
//it is signed and validated based on params we set here
const aws = require('aws-sdk') //aws-sdk is the sdk for all things aws in node
const config = require('./config')
//configure the aws module to use OUR aws account
aws.config.update({
    accessKeyId: config.accessKey,
    secretAccessKey: config.secretAccessKey,
    region: config.defaultRegion,
    signatureVersion: config.signatureVersion,
})

const getS3PutLink = (uniqueS3Key,mimeType,bucket = config.defaultBucket,region = config.defaultRegion)=>{
    return new Promise(async(resolve, reject)=>{
        //this is the part where Express/Node talks to S3
        //and gets a link
        const options = {
            bucket,
            region,
            signatureVersion: config.signatureVersion,
            signatureExpires: 60, //number of seconds the link will be valid for... 60 is the default 
            ACL: 'private', //private is default
            uniquePrefix: true //true is default. If set to false, it will allow keys with the same name
        }
        //create an s3 object from the aws module 
        const s3 = new aws.S3(options)
        const params = {
            Bucket: bucket,
            Key: uniqueS3Key,
            Expires: 60, //in seconds
            ContentType: mimeType,
            ACL: 'private',
        }
        //we run s3.getSignedUrl and pass it the:
            //1. action
            //2. params
            //3. callback
        s3.getSignedUrl('putObject',params,(err,signedLink)=>{
            if(err)throw err // don't use this in production!
            resolve(signedLink)
        })
    })
}

module.exports = getS3PutLink




