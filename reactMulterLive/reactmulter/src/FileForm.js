import React, {Component} from 'react';

class FileForm extends Component{

    handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Form Submitted");
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>

            </form>
        )
    }
}

export default FileForm;