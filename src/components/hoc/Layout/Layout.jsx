import React, { Component } from 'react'
import { Link } from "react-router-dom";

class Layout extends Component {

  render() {

    return (
      <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Social</a>
          <div className="pull-right">
            <ul class="nav navbar-nav navbar-right">
              {this.props.app.authenticationContext != null && <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                  {this.props.app.authenticationContext.user.name}<span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/settings">Settings</Link></li>
                  <li class="divider"></li>
                  <li><Link to="/logout">Log out</Link></li>
                </ul>
              </li>}
            </ul>
          </div>
        </nav>
      </header >
      <main>
        {this.props.children}
      </main>
    </>
    )
  }
}


export default Layout;