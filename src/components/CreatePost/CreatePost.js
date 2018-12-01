import React, { Component } from 'react';
import PostMapper from '../../data/PostMapper'
import Spinner from '../ui/Spinner';
import CreateGif from './gif/CreateGif'
import FieldGroup from '../FieldGroup';

import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './CreatePost.css'

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            showLoading: false
        }
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    submitPostHandler = (e) => {
        e.preventDefault();
        const post = {
            contents: this.state.content
        }

        this.setState({ showLoading: true })
        this.props.onSubmit(post, (post) => {
            this.setState({ showLoading: false });
        });
    }

    render() {

        return (
            <div className="content-container">
                <Spinner loading={this.state.showLoading}>
                    <form onSubmit={this.submitPostHandler}>
                        <FormGroup bsSize="large">
                            <FormGroup controlId="formControlsTextarea">
                                <FormControl style={{ minHeight: '200px' }} componentClass="textarea" placeholder="How are you feeling?" name="content" value={this.state.content} onChange={this.handleChange} />
                            </FormGroup>
                            <input type="submit" value="Submit" />
                        </FormGroup>
                        <CreateGif />
                    </form>
                </Spinner>
            </div>
        )
    }
}


export default CreatePost;