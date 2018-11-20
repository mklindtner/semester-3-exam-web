import React, { Component } from "react";
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import FieldGroup from './FieldGroup';

class AuthenticateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stage: 1,
            countries: [],
            regions: [],
            cities: []
        }
    }

    getValidationState = () => {

    }

    render() {

        const { stage } = this.state;

        return (
            <form>

                {stage == 1 && this.renderFirstStage()}
                {stage == 2 && this.renderSecondStage()}
            </form>
        );
    }

    renderFirstStage = () => {
        return (
            <FormGroup
                controlId="authentication"
                validationState={this.getValidationState()}
            >
                <FieldGroup
                    id="formControlsName"
                    type="text"
                    label="Name"
                    placeholder="Please enter your name."
                />
                <FormGroup controlId="formControlsCountry">
                    <ControlLabel>Country</ControlLabel>
                    <FormControl componentClass="select" placeholder="Select your country">

                    </FormControl>
                </FormGroup>
            </FormGroup>
        );
    }

    renderSecondStage = () => {
        return (
            <div>
            </div>
        )
    }
}

export default AuthenticateForm;