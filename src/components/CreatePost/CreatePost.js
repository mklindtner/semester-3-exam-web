import React, { Component } from 'react';
import PostMapper from '../../data/PostMapper'
import Spinner from '../UI/Spinner/Spinner'
import getAuthenticatedUser from '../../getAuthenticatedUser.js';
import CreateGif from './gif/CreateGif'
import FieldGroup from '../FieldGroup';
import {Redirect} from 'react-router-dom'
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import {withRouter} from 'react-router-dom'
import Modal from '../../components/UI/Modal/Modal'
import './CreatePost.css'

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            imageModalData: null,
            showLoading: false, 
            showModal: false,
            images: [],
            submitted: false,
            fileData: null
        }
    }



    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    contentAddedHandler = (image) =>{
        this.setState({withContent: true, images: [...this.state.images, image]})
    }

    isPostValidleHandler = () =>{
        if(this.state.title == '' || this.state.content == '')
        this.props.history.replace('/post')
        //lav toastr her
    }

    submitPostHandler = (e) => {
        e.preventDefault();

        const post = {
            title: this.state.title,
            contents: this.state.content,
            images: this.state.images
        }

        this.setState({ showLoading: true });

        PostMapper.submitTextPost(post).then(
            this.setState({showLoading: false})
        );
    }

    showModalHandler = () =>{
        this.setState({showModal: !this.state.showModal})
    }

    showModalSpeceficHandler = (event, image) =>{
        let index = this.state.images.indexOf(image)
        if(event.ctrlKey){
            let temp = this.state.images.slice(); //makes a shallow copy of the array
            temp.splice(index, 1); //remove item
            this.setState(prevState => ({ images: temp }));
     }else{
     this.setState(
         state => ({imageModalData: image}),
         () => this.showModalHandler()
     );
    }
}


    addedImageHandler = (image) => {
        console.log(image);
        this.state.images.push(image);
        this.showModalHandler();
    }

    addFileDataHandler = (data) =>{
        this.setState({fileData: data})
    }


    

    render() {
        let image= this.state.images.map((image, index) => {
            return <img key={index} src={image} onClick={(e) =>this.showModalSpeceficHandler(e, image)}/>
        });

        let redirect = null;
        if (this.state.submitted){
            redirect = <Redirect to="/timeline" />;
        }


        return (<div className="SubmitForm">
         {redirect}
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
                        <input type="submit" value="Submit"     />
                    </FormGroup>
                    <div className="thumbnail-container">
                    {image}
                    </div>
                    
                    
                    <Modal show={this.state.showModal} modalClosed={this.showModalHandler}>
                    <CreateGif onSelectUrl={this.addedImageHandler} onSelectFile={this.addFileDataHandler} modalImageData={this.state.imageModalData}  />
                     </Modal >
                </form>
                
                <button onClick={this.showModalHandler}>Attach Images</button>
            </Spinner>
        </div>
        )
    }
}


export default withRouter(CreatePost);