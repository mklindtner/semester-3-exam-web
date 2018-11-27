import React, { Component } from 'react';
import PostMapper from '../../data/PostMapper'
import Spinner from '../ui/Spinner'
import getAuthenticatedUser from '../../getAuthenticatedUser.js';
import CreateGif from './gif/CreateGif'
import FieldGroup from '../FieldGroup';

import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            showLoading: false, 
            withContent: false,
            images: []
        }
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    contentAddedHandler = (image) =>{
        this.setState({withContent: true, images: [...this.state.images, image]})
    }

    submitPostHandler = (e) => {
        e.preventDefault();
        const post = {
            title: this.state.title,
            contents: this.state.content,
            author: getAuthenticatedUser().id,
            images: this.state.images
        }

        this.setState({ showLoading: true })
        this.props.onSubmit(post, (post) => {
            this.setState({ showLoading: false });
        });
    }


    render() {


        return (<div className="SubmitForm">
            <Spinner loading={this.state.showLoading}>
                <form onSubmit={this.submitPostHandler}>
                    <FormGroup bsSize="large">
                        <FieldGroup
                            id="formControlsTitle"
                            type="text"
                            label="Title"
                            name="title"
                            minLength={0}
                            maxLength={255}
                            placeholder="Please enter the title."
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Content</ControlLabel>
                            <FormControl style={{ minHeight: '200px' }} componentClass="textarea" placeholder="Please enter the post content." name="content" value={this.state.content} onChange={this.handleChange} />
                        </FormGroup>
                        <input type="submit" value="Submit" />
                    </FormGroup>
                    <CreateGif onAddGif={this.contentAddedHandler} />
                </form>
            </Spinner>
        </div>
        )
    }
}


export default CreatePost;