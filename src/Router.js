import React from 'react';
import App from './App';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegistrationPage from './components/registration/RegistrationPage';
import AuthenticationPage from './components/authentication/AuthenticationPage';
import Timeline from './components/timeline/Timeline';
import Layout from './components/hoc/Layout/Layout';

export default () => {
    return (
        <Router>
            <App>
                <Layout app={this.state} onLogout={this.onLogout}>
                    <Route path="/registration" component={(router) => <RegistrationPage app={this.state} router={router} onRegistration={this.onRegistration} />} />
                    <Route path="/authentication" component={(router) => <AuthenticationPage app={this.state} router={router} onAuthentication={this.onAuthentication} />} />
                    <Route path="/timeline" component={(router) => <Timeline app={this.state} router={router} />} />
                </Layout>
            </App>
        </Router>
    );
}