import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import FieldGroup from '../FieldGroup';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import './ImageUploadForm.css';

class ProfileImageForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            file: null,
            crop: {
                aspect: 1,
                minWidth: 250,
                minHeight: 250,
                keepSelection: true
            },
            errors: []
        };

        this.pixelSelection = null;
    }

    onSubmit = (event) => {
        event.preventDefault();

        const file = event.target.file.files[0];

        if (this.pixelSelection === null) {
            this.setState({ errors: ["You must place a selection."] });
            return;
        }

        const errors = [];
        if (this.pixelSelection.width < 250)
            errors.push("The width of the selection is too small.");
        if (this.pixelSelection.height < 250)
            errors.push("The height of the selection is too small.");

        this.setState({ errors });

        if (errors.length === 0) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let data = reader.result.replace(/^data:(.*;base64,)?/, '');
                if ((data.length % 4) > 0) {
                    data += '='.repeat(4 - (data.length % 4));
                }

                this.props.onSubmit({ data, crop: this.pixelSelection });
            }
        }
    }

    onFileChange = (event) => {
        const file = event.target.files[0];
        this.setState({ file });
    }

    onCropChange = (crop) => {
        this.setState({ crop });
    }

    onCropComplete = (crop, pixels) => {
        this.pixelSelection = pixels;
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="col-12 image-upload-form-container content-container">
                <p className="content-header">Update profile image</p>
                <form onSubmit={this.onSubmit} className="image-upload-form">
                    <FormGroup controlId="registration-2">
                        <FieldGroup onChange={this.onFileChange}
                            id="formControlsFile"
                            type="file"
                            name="file"
                            label="File"
                            accepts="image/*"
                        />
                        {this.state.file !== null &&
                            <div>
                                <ReactCrop
                                    onComplete={this.onCropComplete}
                                    onChange={this.onCropChange}
                                    src={URL.createObjectURL(this.state.file)}
                                    crop={this.state.crop} />
                            </div>}

                        <Button type="submit">Update</Button>
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

export default ProfileImageForm;