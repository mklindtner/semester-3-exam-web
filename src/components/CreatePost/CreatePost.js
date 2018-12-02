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
            imageModalData: '',
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

    /*  const reader = new FileReader();
        reader.readAsDataURL(urls);
        reader.onload = () => {
            let data = reader.result.replace(/^data:(.*;base64,)?/, '');
            if ((data.length % 4) > 0) {
                data += '='.repeat(4 - (data.length % 4));
            }*/
    
    encodeURLHandler = (images) =>{
        const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        const regex = new RegExp(expression);
        let urls = [];
        images.map(img =>{
        if(!img.match(regex)){
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
        img = reader.result.replace(/^data:(.*;base64,)?/, '');
            if ((img.length % 4) > 0) {
                img += '='.repeat(4 - (img.length % 4));
            }
            }
            urls.push(img);
        }
        urls.push(img);
        });
        return urls;
    }
        

    submitPostHandler = (e) => {
        e.preventDefault();

        const post = {
            contents: this.state.content,
            images: this.encodeURLHandler(this.state.images)
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
         console.log(image);
     this.setState(
         state => ({imageModalData: image}),
         () => this.showModalHandler()
     );
    console.log('image state is: ' + this.state.imageModalData)
    }
}


    addedImageHandler = (image) => {
        console.log(image);
        this.state.images.push(image);
        this.showModalHandler();
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
                  
                        
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Content</ControlLabel>
                            <FormControl style={{ minHeight: '200px' }} componentClass="textarea" placeholder="Please enter the post content." name="content" value={this.state.content} onChange={this.handleChange} />
                        </FormGroup>
                        <input type="submit" value="Submit"     />
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