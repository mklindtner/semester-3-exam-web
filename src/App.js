import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuthenticationPage from './pages/AuthenticationPage';
import Timeline from './components/Timeline/Timeline';

import './App.css';
import Layout from './components/hoc/Layout/Layout'
import User from './components/User/User'

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route path="/authenticate" component={AuthenticationPage} />
          <Timeline />
        </Layout>
      </Router>
    );
  }
}

export default App;
