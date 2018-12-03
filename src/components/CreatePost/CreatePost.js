import React, { Component } from 'react';
import PostMapper from '../../data/PostMapper'
import Spinner from '../UI/Spinner/Spinner'
import getAuthenticatedUser from '../../getAuthenticatedUser.js';
import CreateGif from './gif/CreateGif'
import FieldGroup from '../FieldGroup';
import { Redirect } from 'react-router-dom'
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import { withRouter } from 'react-router-dom'
import Modal from '../../components/UI/Modal/Modal'
import './CreatePost.css'

class CreatePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            showLoading: false,
            showModal: false,
            showImage: null,
            images: []
        }

        this.postMapper = new PostMapper();
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    submitPostHandler = (e) => {

        e.preventDefault();

        const post = {
            contents: this.state.content,
            images: this.state.images
        }

        this.setState({ showLoading: true });
        this.props.onSubmit(post, response => {
            this.setState({ showLoading: false })
        });
    }

    getCorrectFormat = async (image, callback) => {

        if (image.type === "URL") {
            callback({
                data: image.toSubmit,
                description: ""
            })
        }

        if (image.type === "FILE") {
            const base64 = await this.toBase64(image.toSubmit);
            callback({
                data: base64,
                description: ""
            })
        }
    }

    toBase64(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = reader.result.replace(/^data:(.*;base64,)?/, '');
                if ((base64.length % 4) > 0) {
                    base64 += '='.repeat(4 - (base64.length % 4));
                }

                resolve(base64);
            };
        });
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }

    onThumbnailClick = (event, image) => {
        let index = this.state.images.indexOf(image)
        if (event.ctrlKey) {
            let temp = this.state.images.slice(); //makes a shallow copy of the array
            temp.splice(index, 1); //remove item
            this.setState(prevState => ({ images: temp }));
        } else {
            this.setState({
                showImage: image
            })
        }
    }

    onThumbnailFullClose = () => {
        this.setState({ showImage: null });
    }

    addedImageHandler = (image) => {
        this.getCorrectFormat(image, result => {
            this.setState({ images: this.state.images.concat({ ...result, src: image.src }) })
        })
        this.toggleModal();
    }

    render() {
        return (
            <div className="create-post">
                <Spinner loading={this.state.showLoading}>
                    <div className="content-container">
                        <p className="content-header">Create Post</p>
                        <form onSubmit={this.submitPostHandler}>
                            <FormGroup controlId="formControlsTextarea">
                                <FormControl style={{ minHeight: '200px' }} componentClass="textarea" placeholder="Please enter the post content." name="content" value={this.state.content} onChange={this.handleChange} />
                            </FormGroup>
                            <div className="create-post-thumbnails">
                                {this.state.images.map((image, index) =>
                                    <div key={index} className="thumbnail-container">
                                        <img src={image.src} onClick={(e) => this.onThumbnailClick(e, image)} />
                                    </div>
                                )}
                            </div>
                            <input type="submit" value="Submit" />
                        </form>
                        <Modal show={this.state.showModal} onClose={this.toggleModal}>
                            <CreateGif onImageAdded={this.addedImageHandler} image={this.state.showImage} />
                        </Modal >

                        {this.state.showImage &&
                            <Modal show={true} onClose={this.toggleModal} onClose={this.onThumbnailFullClose}>
                                <img src={this.state.showImage.src} />
                            </Modal >}
                        {!this.state.showModal && <button onClick={this.toggleModal} >Attach Images</button>}
                    </div>
                </Spinner>
            </div>
        )
    }
}


export default withRouter(CreatePost);