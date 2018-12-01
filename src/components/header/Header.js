import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import UserSearch from "../search/UserSearch";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0
    };
  }

  updateDimensions = () => {
    console.log(document.documentElement.clientWidth);
    this.setState({ width: document.documentElement.clientWidth });
  };

  componentWillMount = function() {
    this.updateDimensions();
  };

  componentDidMount = function() {
    window.addEventListener("resize", this.updateDimensions);
  };
  componentWillUnmount = function() {
    window.removeEventListener("resize", this.updateDimensions);
  };

  render() {
    return (
      <header onRes>
        <nav id="header-nav" class="row">
          <div className="left">
            <a className="nav-link" href="#">
              Social
            </a>
          </div>
          <div className="left">
            <a className="nav-link" href="/timeline">
              Timeline
            </a>
          </div>
          <div className="left search-input" style={{ width: this.state.width - 340 }}>
            <UserSearch />
          </div>
          <div className="right user-status">
            <ul className="nav navbar-nav navbar-right">
              {this.props.app.authenticationContext != null && (
                <li className="dropdown" id="user-status">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                  >
                    {this.props.app.authenticationContext.user.name}
                    <span className="caret" />
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/settings">Settings</Link>
                    </li>
                    <li className="divider" />
                    <li onClick={this.props.onLogout}>
                      <a href="#">Log out</a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
