import React, {Component} from 'react';
import axios from 'axios';
class FileForm extends Component{

    handleSubmit = (e)=>{
        e.preventDefault();
        // console.log("Form Submitted");
        const file = document.getElementById('file-field').files[0];
        const file2 = document.getElementById('file-field2').files[0];
        const url = 'http://localhost:3000/uploads3';
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const data = new FormData();
        data.append('meme',file);
        // data.append('meme',file2);
        // console.log(data);
        // for(let pair of data.entries()){
        //     console.log(pair[0])
        //     console.log(pair[1])
        // }
        axios.post(url,data,config).then((response)=>{
            console.log(response.data);
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input id="file-field" type="file" name="meme" />
                <input id="file-field2" type="file" name="meme" />
                <input type="submit" value="submit" />
            </form>
        )
    }
}

export default FileForm;