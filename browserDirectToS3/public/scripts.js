const updateProgressBar = e=>{
    console.log(e)
    const progressDone = e.progress
    const barWidth = Math.floor(progressDone * 100)
    const barStyle = `${barWidth}%`
    document.querySelector('.progress-bar').style.width = barStyle
    document.querySelector('.progress-bar').setAttribute('aria-valuenow',barWidth)
}

const addFile = async e=>{
    e.preventDefault()
    const file = e.target[0].files[0]
    // console.log(file)
    //Step 1 - get a link from Express so we can upload our file DIRECTLY to S3
    const data = {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
    }
    const postUrl = `http://localhost:3000/get-put-link`
    const postResp = await axios.post(postUrl,data)
    console.log(postResp)
    //postResp.data = signedLink,mimeType,uniqueKeyName
    const postData = postResp.data
    // console.log(postData)
    //Step 2 - turn on the progressBar
    if(!postData.signedLink){
        swal({
            title: "Express rejected the link",
            icon: "error"
        })
        return //end the function! there was an error!
    }
    //we have a link!
    document.getElementById('progress-wrapper').style.display = "block"
    //Step 3 - try and upload the file to S3
    const awsFinalResp = await new Promise(async(resolve, reject)=>{
        try{
            const config = {}
            //content-type MUST match what Express told S3
            config.headers = {
                'content-type': postData.mimeType,
            }
            config.onUploadProgress = e=> updateProgressBar(e)
            //aws is expecting a put http verb
            //file is the entire file... we didn't have to send to express
            const awsResp = await axios.put(postData.signedLink,file,config)
            console.log(awsResp)
            resolve(awsResp)
        }catch(err){
            console.log(err)
            reject(err)
        }
    })
    if(awsFinalResp.status !== 200){
        //let express know it failed, for some non js reason
    }

    //Step 4 - aws did not err, so let express know what happend
    const finalUrlToExpress = `http://localhost:3000/finalize-upload`
    const finalData = {
        key: postData.uniqueKeyName, 
    }
    const expressResp = await axios.post(finalUrlToExpress, finalData)
    const imgLink = expressResp.data
    document.getElementById('current-image').innerHTML = `<img src="${imgLink}" width="100%" />`

}

document.getElementById('file-form').addEventListener('submit',addFile)