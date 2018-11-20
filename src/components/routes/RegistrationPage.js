import React, { Component } from "react";
import RegistrationForm from "../RegistrationForm";

class RegistrationPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Authentication</h2>
                <RegistrationForm />
            </div>
        );
    }
}

export default RegistrationPage;