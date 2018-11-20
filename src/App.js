import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegistrationPage from './components/registration/RegistrationPage';
import AuthenticationPage from './components/authentication/AuthenticationPage';
import Timeline from './components/timeline/Timeline';

import './App.css';
import Layout from './components/hoc/Layout/Layout';

class App extends Component {

  constructor(props) {
    super(props);
//    const authenticationContext = localStorage.getItem("authenticationContext");
//    console.log(authenticationContext);
//    if (authenticationContext !== null){
//      console.log(authenticationContext);
//     authenticationContext = JSON.parse(authenticationContext);
//    }
//    this.state = { authenticationContext: authenticationContext };
  }

  onAuthentication = (authenticationContext) => {
//    const text = JSON.stringify({token: authenticationContext.token});
//    localStorage.setItem("authenticationContext", text);
    this.setState({ authenticationContext });
  }

  onRegistration = (user) => {
    console.log({ onRegistration: user });
  }

  render() {
    return (
      <Router>
        <Layout>
          <Route path="/registration" component={(router) => <RegistrationPage app={this.state} router={router} onRegistration={this.onRegistration} />} />
          <Route path="/authentication" component={(router) => <AuthenticationPage app={this.state} router={router} onAuthentication={this.onAuthentication} />} />
          <Route path="/timeline" component={(router) => <Timeline app={this.state} router={router} />} />
        </Layout>
      </Router>
    );
  }
}

export default App;
