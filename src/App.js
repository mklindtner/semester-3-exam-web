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
import { ToastContainer } from "react-toastr";

class App extends Component {
  constructor(props) {
    super(props);

    const authenticationContext = localStorage.getItem("authenticationContext");
    if (authenticationContext !== null) {
      this.state = { authenticationContext: JSON.parse(authenticationContext) };
    } else this.state = {};

    this.toastr = null;
  }

  onAuthentication = authenticationContext => {
    const text = JSON.stringify(authenticationContext);
    localStorage.setItem("authenticationContext", text);
    this.setState({ authenticationContext });
    this.props.router.history.push("/profile");
    this.toastr.success("You are now authenticated.");
  };

  onLogout = () => {
    localStorage.removeItem("authenticationContext");
    this.setState({ authenticationContext: null });
    this.props.router.history.push("/authentication");
    //toastr.success('Have fun storming the castle!', 'Miracle Max Says')
  };

  onRegistration = user => {
    this.props.router.history.push("/authentication");
  };

  render() {
    return ( 
      <>
      <ToastContainer
        ref={ref => this.toastr = ref}
        className="toast-top-right"
      />
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

