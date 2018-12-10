import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import UserSearch from "../search/UserSearch";
import MediaQuery from "react-responsive";

class Header extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      width: 0
    };
  }

  updateDimensions = () => {
    this.setState({ width: document.documentElement.clientWidth });
  };

  componentWillMount = function () {
    this.updateDimensions();
  };

  componentDidMount = function () {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  };
<<<<<<< HEAD

  componentWillUnmount = function() {
=======
  componentWillUnmount = function () {
>>>>>>> be76a2eea43958535a72bf97c2a50d34c437280c
    window.removeEventListener("resize", this.updateDimensions);
  };

  render() {
    return (
      <header id="header">
        <MediaQuery maxWidth={470}>
          {matches => {
            if (matches) {
              return (
                <div>
                  <div className="search-input col-xs-9">
                    <div className="search-input-max">
                      <UserSearch />
                    </div>
                  </div>
<<<<<<< HEAD
                  <div className="col-xs-3">
                  <a
                      class="dropdown-toggle"
                      href="#"
                      id="dropdownMenuLink"
=======
                  <div className="btn-group col-xs-3">
                    <button
                      className="btn btn-default dropdown-toggle"
                      type="button"
                      id="dropdownMenu"
>>>>>>> be76a2eea43958535a72bf97c2a50d34c437280c
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img src="/pictures/menu.svg" id="menu" width="35" height="35" title="Burger menu" alt="Menu"></img>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenu"
                    >
                      <li>
                        <Link to="/friend-requests">Friend requests</Link>
                      </li>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/settings">Settings</Link>
                      </li>
                      <li>
                        <Link to="/timeline">Timeline</Link>
                      </li>
                      <li className="divider" />
                      <li onClick={this.props.onLogout}>
                        <a href="#">Log out</a>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          }}
        </MediaQuery>
        <MediaQuery maxWidth={850} minWidth={471}>
          {matches => {
            if (matches) {
              return (
                <div>
                  <a id="timeline" className="col-xs-2" href="/timeline">
                    Timeline
                  </a>
                  <div className="search-input col-xs-5">
                    <UserSearch />
                  </div>
                  <div className="text-right btn-group col-xs-5 pull-right">
                    <a
                      class="link dropdown-toggle"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {this.props.app.authenticationContext.user.name}
                      <span className="caret" />
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenu"
                    >
                      <li>
                        <Link to="/friend-requests">Friend requests</Link>
                      </li>
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
                  </div>
                </div>
              );
            } else {
              return null;
            }
          }}
        </MediaQuery>
        <MediaQuery minWidth={851}>
          {matches => {
            if (matches) {
              return (
                <div>
                  <a id="social" className="col-xs-1" href="#">
                    Social
                  </a>
                  <a id="timeline" className="col-xs-1" href="/timeline">
                    Timeline
                  </a>
                  <div className="search-input col-xs-5">
                    <UserSearch />
                  </div>
                  <div className="text-right btn-group col-xs-5 pull-right">
                    <a
                      class="link dropdown-toggle"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {this.props.app.authenticationContext.user.name}
                      <span className="caret" />
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenu"
                    >
                      <li>
                        <Link to="/friend-requests">Friend requests</Link>
                      </li>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/chat">Chat</Link>
                      </li>
                      <li>
                        <Link to="/settings">Settings</Link>
                      </li>
                      <li className="divider" />
                      <li onClick={this.props.onLogout}>
                        <a href="#">Log out</a>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          }}
        </MediaQuery>
      </header>
    );
  }
}

export default Header;
