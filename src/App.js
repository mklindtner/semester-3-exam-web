import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegistrationPage from './components/registration/RegistrationPage';
import AuthenticationPage from './components/authentication/AuthenticationPage';
import Timeline from './components/timeline/Timeline';

import './App.css';
import Layout from './components/hoc/Layout/Layout';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {authenticationContext: null}
  }

  onAuthenticate = (user) => {

  }

  onRegistration = (user) => {
    
  }

  render() {
    return (
      <Router>
        <Layout>
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/authentication" component={AuthenticationPage} />
          <Route path="/timeline" component={Timeline} />
        </Layout>
      </Router>
    );
  }
}

export default App;
