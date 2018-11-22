import React from 'react';
import App from './App';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegistrationPage from './components/registration/RegistrationPage';
import AuthenticationPage from './components/authentication/AuthenticationPage';
import Timeline from './components/timeline/Timeline';

export default () => {
    return (
        <Router>
            <Route path="*" component={router =>
                <App router={router}/>
            } />
        </Router>
    );
}