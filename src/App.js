import React, { Component } from "react";
import RegistrationPage from "./components/registration/RegistrationPage";
import AuthenticationPage from "./components/authentication/AuthenticationPage";
import Timeline from "./components/timeline/Timeline";
import ProfilePage from "./components/profile/ProfilePage";
import { createBrowserHistory } from "history";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreatePost from "./components/CreatePost/CreatePost";
import HomePage from './components/HomePage';

class App extends Component {
  constructor(props) {
    super(props);

    const authenticationContext = localStorage.getItem("authenticationContext");
    if (authenticationContext !== null) {
      this.state = { authenticationContext: JSON.parse(authenticationContext) };
    } else this.state = {};
  }

  onAuthentication = authenticationContext => {
    const text = JSON.stringify(authenticationContext);
    localStorage.setItem("authenticationContext", text);
    this.setState({ authenticationContext });
    this.props.router.history.push("/profile");
  };

  onLogout = () => {
    localStorage.removeItem("authenticationContext");
    this.setState({ authenticationContext: null });
    this.props.router.history.push("/authentication");
  };

  onRegistration = user => {
    this.props.router.history.push("/authentication");
  };

  render() {
    return ( 
      <>
      <Route exact={true} path="/" component={HomePage} />
      <Route
        path="/profile/:user?"
        component={router => (
          <ProfilePage app={this.state} router={router} onLogout={this.onLogout} />
        )}
      />
      <Route
        path="/registration"
        component={router =>
          <HomePage component={() =>
            <RegistrationPage
              app={this.state}
              router={router}
              onRegistration={this.onRegistration}
            />
          } />
        } />
      <Route
        path="/authentication"
        component={router =>
          <HomePage component={() =>
            <AuthenticationPage
              app={this.state}
              router={router}
              onAuthentication={this.onAuthentication}
            />
          } />
        } />
      <Route
        path="/timeline"
        component={router => <Timeline app={this.state} router={router} onLogout={this.onLogout} />}
      />
      <Route path="/post" component={router => <CreatePost />} />
  </>
        );
  }
}

export default App;

