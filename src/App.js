import React, { Component } from "react";
import RegistrationPage from "./components/registration/RegistrationPage";
import AuthenticationPage from "./components/authentication/AuthenticationPage";
import Timeline from "./components/timeline/Timeline";
import ProfilePage from "./components/profile/ProfilePage";
import { createBrowserHistory } from "history";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import CreatePost from "./components/CreatePost/CreatePost";
import HomePage from './components/HomePage';
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import SettingsPage from "./components/SettingPage";
import FriendRequestsPage from "./components/FriendRequestsPage";
import ErrorPage from './components/Error/ErrorPage';


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
    this.toastr.success("You are now logged in.");
  };

  onLogout = () => {
    localStorage.removeItem("authenticationContext");
    this.setState({ authenticationContext: null });
    this.props.router.history.push("/login");
    this.toastr.success("You are now logged out.");
  };

  onRegistration = user => {
    this.props.router.history.push("/login");
    this.toastr.success("Your user account was created.")
  };

  toastrFactory = () => {
    return this.toastr;
  }

  render() {
    return ( 
      <>
      <div id="top-container">
        <ToastContainer
          ref={ref => this.toastr = ref}
          className="toast-top-right"
          toastMessageFactory={React.createFactory(ToastMessageAnimated)}
        />
        {/*<Route component={ErrorPage}/>  skal testes*/}
        <Route exact={true} path="/" component={HomePage} />
        <Route
          path="/profile/:user?/:tab?"
          component={router => (
            <ProfilePage app={this.state} router={router} toastrFactory={this.toastrFactory} onLogout={this.onLogout} />
          )}
        />
        <Route path="/settings" component={router =>
          <SettingsPage
            app={this.state}
            router={router}
            onLogout={this.onLogout}
            toastrFactory={this.toastrFactory}
          />}
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
          path="/login"
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
          component={router => <Timeline app={this.state} router={router} toastrFactory={this.toastrFactory} onLogout={this.onLogout} />}
        />
        <Route
          path="/friend-requests"
          component={router => <FriendRequestsPage app={this.state} router={router} toastrFactory={this.toastrFactory} onLogout={this.onLogout} />}
        />
        <Route path="/post" component={router => <CreatePost />} />
        <Switch>
        <Route path="*" exact={true} component={ErrorPage}></Route>
        </Switch>
  </div>
  </>
        );
  }
}

export default App;

