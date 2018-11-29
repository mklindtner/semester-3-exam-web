import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './Header.css';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Social</a>
          <div className="pull-left">
            <ul className="nav navbar-nav navbar-left">
              <li className="nav-item">
                <a className="nav-link" href="timeline">Timeline</a>
              </li>
            </ul>
          </div>
          <div className="pull-right">
            <ul className="nav navbar-nav navbar-right">
              {this.props.app.authenticationContext != null &&
                <li className="dropdown" id="user-status">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                    {this.props.app.authenticationContext.user.name}<span className="caret"></span></a>
                  <ul className="dropdown-menu" role="menu">
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    <li className="divider"></li>
                    <li onClick={this.props.onLogout}><a href="#">Log out</a></li>
                  </ul>
                </li>}
            </ul>
          </div>
        </nav>
      </header >
    )
  }
}

export default Header;