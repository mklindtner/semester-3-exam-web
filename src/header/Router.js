import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const header = () =>{
    return <Router>
    <Layout app={this.state} onLogout={this.onLogout}>
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
    </Layout>
  </Router>
}

export default header;