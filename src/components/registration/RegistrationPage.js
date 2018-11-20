import React, { Component } from "react";
import RegistrationForm from "./RegistrationForm";
import { Link } from "react-router-dom";

class RegistrationPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Registration</h2>
                <p>Create an account to more easily connect with your friends and family.</p>
                <p>If you already have an account, you can click <Link to="/authentication">here</Link> to authenticate.</p>
                <RegistrationForm onRegistration={this.props.onRegistration} />
            </div>
        );
    }
}

export default RegistrationPage;