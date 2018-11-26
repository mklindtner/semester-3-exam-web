import React, { Component } from "react";
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import FieldGroup from '../FieldGroup';
import LocationMapper from '../../data/LocationMapper';
import UserMapper from '../../data/UserMapper';

var DatePicker = require("react-16-bootstrap-date-picker");

class AuthenticationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: []
        }

        this.userMapper = new UserMapper();
    }

    render() {

        const { email, password, errors } = this.state;

        return (
            <form id="authentication-form">
                <FormGroup controlId="registration-2">
                    <FieldGroup
                        id="formControlsEmail"
                        type="email"
                        label="Email"
                        minLength={0}
                        placeholder="Enter your email."
                        onChange={this.onEmailChange}
                    />
                    <FieldGroup
                        id="formControlsPassword"
                        type="password"
                        label="Password"
                        minLength={0}
                        placeholder="Enter your password."
                        onChange={this.onPasswordChange}
                    />
                    <Button onClick={this.onSubmit}>Log in</Button>
                </FormGroup>
                {errors.length > 0 && <div className="form-errors">
                    {errors.map((error, index) =>
                        <div key={index} className="alert alert-danger">
                            <p>{error}</p>
                        </div>
                    )}
                </div>}
            </form>
        );
    }

    onEmailChange = (event) => {
        const value = event.target.value;
        this.setState({ email: value });
    }

    onPasswordChange = (event) => {
        const value = event.target.value;
        this.setState({ password: value });
    }

    onSubmit = () => {
        this.userMapper.authenticate(this.state.email, this.state.password).then(response => {
            
            if (response.status === 200) {
                this.props.onAuthentication(response.body);
                this.setState({ errors: [] });
                return;
            }

            if (response.status === 401) {
                this.setState({ errors: ["Incorrect email or password."] });
                return;
            }

            this.setState({ errors: ["An error occurred."] });
        })
    }
}

export default AuthenticationForm;