import React, {Component} from 'react';
import {Alert, Button} from 'react-bootstrap';
import PostMapper from '../../data/PostMapper'
import Spinner from '../ui/Spinner'
import getAuthenticatedUser from '../../getAuthenticatedUser.js';
import {FormGroup} from 'react-bootstrap'
import CreateGif from './gif/CreateGif'
class CreatePost extends Component{
    constructor(props){
        super(props);

        this.postMapper = new PostMapper();
    
    this.state = {
        title: '',
        content: '',
        userId: '',
        showLoading: false 
    }

    this.handleChange = this.handleChange.bind(this);
}

    handleChange (evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }


    submitPostHandler = (e) => {
        e.preventDefault();
        const post = {
            title: this.state.title,
            contents: this.state.content,
            author: getAuthenticatedUser().id
        }

        this.setState({showLoading: true})
        this.postMapper.submitPost(post).then(response => {
        console.log(response)
        this.setState({showLoading: false})
        });
        
    
    }


    render(){
     
        
        return(<div className="SubmitForm">
              {this.state.showLoading && <Spinner bsStyle="succes"/>}
              {!this.state.showLoading &&
              <form onSubmit={this.submitPostHandler}>
              <FormGroup bsSize="large">
                   <label>
                     Title:
                     <textarea value={this.state.value} onChange={this.handleChange} name="title"/>
                   </label>
                   <label>
                     Content:
                     <textarea value={this.state.value} onChange={this.handleChange} name="content" />
                   </label>
                   <input type="submit" value="Submit" />
                   </FormGroup>
                 </form>
              }
              <CreateGif />
                 </div> 
        )
    }
}


export default CreatePost;