import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegistrationPage from './components/routes/RegistrationPage';
import Timeline from './components/routes/timeline/Timeline';

import './App.css';
import Layout from './components/hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/timeline" component={Timeline} />
        </Layout>
      </Router>
    );
  }
}

export default App;
