import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegistrationPage from './components/routes/RegistrationPage';

import './App.css';
import Layout from './components/hoc/Layout/Layout'
import User from './components/User/User'

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route path="/registration" component={RegistrationPage} />
        </Layout>
      </Router>
    );
  }
}

export default App;
