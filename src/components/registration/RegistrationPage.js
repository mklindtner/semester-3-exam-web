import React, { Component } from "react";
import RegistrationForm from "./RegistrationForm";

class RegistrationPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Registration</h2>
                <p>Create an account to more easily connect with your friends and family.</p>
                <RegistrationForm />
            </div>
        );
    }
}

export default RegistrationPage;