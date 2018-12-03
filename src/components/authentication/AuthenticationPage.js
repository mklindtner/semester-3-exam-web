import React, { Component } from "react";
import AuthenticationForm from "./AuthenticationForm";
import { Link } from "react-router-dom";
import './AuthenticationPage.css';

const authenticationPage = (props) => {

        return (
            <div id="authentication-page" className="row">
                <h2>Login</h2>
                <p>Log in to your user account, to see new posts from your friends and family.</p>
                <p>If you do not have an account, you can click <Link to="/registration">here</Link> to create an account.</p>
                <AuthenticationForm onAuthentication={props.onAuthentication} />
            </div>
        );
    }


export default authenticationPage;