import React, { Component } from "react";
import RegistrationPage from "./components/registration/RegistrationPage";
import AuthenticationPage from "./components/authentication/AuthenticationPage";
import Timeline from "./components/timeline/Timeline";
import ProfilePage from "./components/profile/ProfilePage";
import { createBrowserHistory } from "history";
import router from './header/Router'
import "./App.css";
import Layout from "./components/hoc/Layout/Layout";

class App extends Component {
  constructor(props) {
    super(props);

    const authenticationContext = localStorage.getItem("authenticationContext");
    if (authenticationContext !== null) {
      this.state = { authenticationContext: JSON.parse(authenticationContext) };
      console.log(authenticationContext);
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
     <router />
    )
  }
}

export default App;
