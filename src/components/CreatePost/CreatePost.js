import React, {Component} from 'react';
import {Alert, Button} from 'react-bootstrap';
import config from '../../config.js'
import PostMapper from '../data/PostMapper'

class CreatePost extends Component{
    constructor(props){
        super(props);
    
    this.state = {
        title: '',
        content: '',
        showAlert: false
    }
    this.handleChange = this.handleChange.bind(this);
}



    handleDeletePost(){

    }

    handleChange (evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }


    
    handleDismiss(){
        this.setState({showAlert: false})
    }

    submitPostHandler() {

        const post = {
            title: this.state.title,
            content: this.state.content
        }
        PostMapper.submitPosts(post)
        /* skal ændres efter Thomas har lavet errorhandling */

        this.setState({showAlert: true})
    
    
    }


    render(){
        function SuccesAlert() {
            if(showAlert){
                
            }
        }

        return(    
            <div className="SubmitForm">
            {showAlert && <Alert bsStyle="succes" />}
            <form onSubmit={this.submitPostHandler}>
            <label>
              Title:
              <textarea value={this.state.value} onChange={this.handleChange} name="title"/>
            </label>
            <label>
              Content:
              <textarea value={this.state.value} onChange={this.handleChange} name="content" />
            </label>
            <input type="submit" value="Submit" />
          </form>
          </div>
        )
    }
}


export default CreatePost;