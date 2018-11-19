import React, { Component } from 'react';
import './App.css';
import Layout from './components/hoc/Layout/Layout'
import User from './components/User/User'

class App extends Component {
  render() {
    return (
  <Layout>
      <User name="jonas" />
      <User />
  </Layout>
    );
  }
}

export default App;
