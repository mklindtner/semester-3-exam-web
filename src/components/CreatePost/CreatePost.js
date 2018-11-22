import React, {Component} from 'react';
import {Alert, Button} from 'react-bootstrap';
import PostMapper from '../../data/PostMapper'
import Spinner from '../ui/Spinner'

class CreatePost extends Component{
    constructor(props){
        super(props);

        this.postMapper = new PostMapper();
    
    this.state = {
        title: '',
        content: '',
        showLoading: false
        
    }
    this.handleChange = this.handleChange.bind(this);
}



    handleDeletePost(){

    }

    handleChange (evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }


    submitPostHandler = (e) => {
        e.preventDefault();
        const post = {
            title: this.state.title,
            content: this.state.content
        }

        this.postMapper.submitPost(post).then(response => {
        console.log(response)
        this.setState({showLoading: true})
        });
        
    
    }


    render(){
     
        
        return( <div className="SubmitForm">
              {this.state.showLoading && <Spinner bsStyle="succes"/>}
              {!this.state.showLoading &&
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
                 </form>}
                 </div> 

        )
    }
}


export default CreatePost;