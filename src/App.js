import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegistrationPage from './components/registration/RegistrationPage';
import AuthenticationPage from './components/authentication/AuthenticationPage';
import Timeline from './components/timeline/Timeline';

import './App.css';
import Layout from './components/hoc/Layout/Layout.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    const authenticationContext = localStorage.getItem("authenticationContext");
    if (authenticationContext !== null)
      this.state = { authenticationContext: JSON.parse(authenticationContext) };
  }

  onAuthentication = (authenticationContext) => {
    const text = JSON.stringify(authenticationContext);
    localStorage.setItem("authenticationContext", text);
    this.setState({ authenticationContext });
  }

  onRegistration = (user) => {
  
  }

  render() {
    return (
      <Router>
        <Layout app={this.state}>
          <Route path="/registration" component={(router) => <RegistrationPage app={this.state} router={router} onRegistration={this.onRegistration} />} />
          <Route path="/authentication" component={(router) => <AuthenticationPage app={this.state} router={router} onAuthentication={this.onAuthentication} />} />
          <Route path="/timeline" component={(router) => <Timeline app={this.state} router={router} />} />
        </Layout>
      </Router>
    );
  }
}

export default App;
