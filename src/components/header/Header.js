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

  componentWillMount = function() {
    this.updateDimensions();
  };

  componentDidMount = function() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  };
  componentWillUnmount = function() {
    window.removeEventListener("resize", this.updateDimensions);
  };

  toggle = () => {
    const node = this.myRef.current;
    node.classList.toggle("change");
  };

  render() {
    return (
      <header>
        <MediaQuery maxWidth={470}>
          {matches => {
            if (matches) {
              return (
                <div>
                  <div className="col-xs-8 ">
                    <UserSearch />
                  </div>
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
                          <span>
                            <div
                              class="container dropdown-toggle"
                              ref={this.myRef}
                              onClick={this.toggle}
                            >
                              <div class="bar1" />
                              <div class="bar2" />
                              <div class="bar3" />
                            </div>
                          </span>
                        </a>
                        <ul className="dropdown-menu" role="menu">
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
                      </li>
                    )}
                  </ul>
                </div>
              );
            } else {
              return null;
            }
          }}
        </MediaQuery>
        <MediaQuery maxWidth={850} minWidth={470}>
          {matches => {
            if (matches) {
              return (
                <div>
                  <nav id="header-nav">
                    <div className="left col-s-2">
                      <a className="nav-link" href="/timeline">
                        Timeline
                      </a>
                    </div>
                    <div className="left search-input col-s-6">
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
                                <Link to="/friend-requests">
                                  Friend requests
                                </Link>
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
                          </li>
                        )}
                      </ul>
                    </div>
                  </nav>
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
                  <nav id="header-nav">
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
                    <div className="left search-input col-7">
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
                                <Link to="/friend-requests">
                                  Friend requests
                                </Link>
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
                          </li>
                        )}
                      </ul>
                    </div>
                  </nav>
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
