import React, { Component } from "react";
import RegistrationPage from "./components/registration/RegistrationPage";
import AuthenticationPage from "./components/authentication/AuthenticationPage";
import Timeline from "./components/timeline/Timeline";
import ProfilePage from "./components/profile/ProfilePage";
import { createBrowserHistory } from "history";
import "./App.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import CreatePost from "./components/CreatePost/CreatePost";

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    const authenticationContext = localStorage.getItem("authenticationContext");
    if (authenticationContext !== null) {
      this.state = { authenticationContext: JSON.parse(authenticationContext) };
    } else this.state = {};
  }

  onAuthentication = authenticationContext => {
    const text = JSON.stringify(authenticationContext);
    localStorage.setItem("authenticationContext", text);
    this.setState({ authenticationContext });
  };

  onLogout = () => {
    localStorage.removeItem("authenticationContext");
    this.setState({ authenticationContext: null });
    createBrowserHistory.apply().push("/authentication");
  };

  onRegistration = user => {};

  render() {
    return ( 
      <>
    <Route
        path="/profile/:user?"
        component={router => (
          <ProfilePage app={this.state} router={router} />
        )}
      />
      <Route
        path="/registration"
        component={router => (
          <RegistrationPage
            app={this.state}
            router={router}
            onRegistration={this.onRegistration}
          />
        )}
      />
      <Route
        path="/authentication"
        component={router => (
          <AuthenticationPage
            app={this.state}
            router={router}
            onAuthentication={this.onAuthentication}
          />
        )}
      />
      <Route
        path="/timeline"
        component={router => <Timeline app={this.state} router={router} />}
      />
  </>
    );
  }
}

export default App;
