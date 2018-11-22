import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import FieldGroup from '../FieldGroup';
import ImageMapper from '../../data/ImageMapper';

import './ImageUploadForm.css';

class ImageUploadForm extends Component {

    constructor(props) {
        super(props);

        this.state = { errors: [] };
        this.imageMapper = new ImageMapper();
    }

    onSubmit = (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const file = event.target.file.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let data = reader.result.replace(/^data:(.*;base64,)?/, '');
            if ((data.length % 4) > 0) {
                data += '='.repeat(4 - (data.length % 4));
            }

            this.imageMapper.create({ title, data });
        }
    }

    render() {

        const { title, images } = this.props;
        const { errors } = this.state;

        return (
            <div className="col-12 image-upload-form-container">
                <h2>Upload image</h2>
                <form onSubmit={this.onSubmit} className="image-upload-form">
                    <FormGroup controlId="registration-2">
                        <FieldGroup
                            id="formControlsTitle"
                            type="text"
                            name="title"
                            label="Title"
                            minLength={0}
                            placeholder="Title your image."
                        />
                        <FieldGroup
                            id="formControlsFile"
                            type="file"
                            name="file"
                            label="File"
                            minLength={0}
                            accepts="image/*"
                        />
                        <Button type="submit">Upload image</Button>
                    </FormGroup>
                    {errors.length > 0 && <div className="form-errors">
                        {errors.map((error, index) =>
                            <div key={index} className="alert alert-danger">
                                <p>{error}</p>
                            </div>
                        )}
                    </div>}
                </form>
            </div>
        );
    }
}

export default ImageUploadForm;