import React, { Component } from "react";
import AuthenticateForm from "../components/AuthenticationForm";

class AuthenticationPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Authentication</h2>
                <AuthenticateForm />
            </div>
        );
    }
}

export default AuthenticationPage;