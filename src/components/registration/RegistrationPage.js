import React, { Component } from "react";
import RegistrationForm from "./RegistrationForm";
import { Link } from "react-router-dom";
import './RegistrationPage.css';

export default (props) => {

    return (
        <div className="row" id="registration-page">
            <h2>Registration</h2>
            <p>Create an account to more easily connect with your friends and family.</p>
            <p>If you already have an account, you can click <Link to="/login">here</Link> to authenticate.</p>
            <RegistrationForm onRegistration={props.onRegistration} />
        </div>
    );
}