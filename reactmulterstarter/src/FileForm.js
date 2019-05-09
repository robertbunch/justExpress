import React, {Component} from 'react';

class FileForm extends Component{

    handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Form Submitted");
    }

    render(){
        return(
            <div>
                <h1>Sanity Check</h1>
                <form onSubmit={this.handleSubmit}>

                </form>
            </div>
        )
    }
}

export default FileForm;