import React, { Component } from "react";
import AuthenticationForm from "./AuthenticationForm";

class AuthenticationPage extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <h2>Authentication</h2>
                <p>Log in to your user account, to see new posts from your friends and family.</p>
                <AuthenticationForm />
            </div>
        );
    }
}

export default AuthenticationPage;