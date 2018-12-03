import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import FieldGroup from '../FieldGroup';

import './ImageUploadForm.css';

class ImageUploadForm extends Component {

    onSubmit = (event) => {
        event.preventDefault();

        const description = event.target.description.value;
        const file = event.target.file.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let data = reader.result.replace(/^data:(.*;base64,)?/, '');
            if ((data.length % 4) > 0) {
                data += '='.repeat(4 - (data.length % 4));
            }

            this.props.onSubmit({description, data});
        }
    }

    render() {

        const { description, images } = this.props;

        return (
            <div className="col-12 image-upload-form-container content-container">
                <p className="content-header">Upload image</p>
                <form onSubmit={this.onSubmit} className="image-upload-form">
                    <FormGroup controlId="registration-2">
                        <FieldGroup
                            id="formControlsDescription"
                            type="text"
                            name="description"
                            minLength={0}
                            placeholder="What is happening in this image?"
                        />
                        <FieldGroup
                            id="formControlsFile"
                            type="file"
                            name="file"
                            minLength={0}
                            accepts="image/*"
                        />
                        <Button type="submit">Upload image</Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}

export default ImageUploadForm;