import React, { Component } from "react";
import RollingPosts from "./RollingPosts";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return (
      <>
        <div className="page-header container">
        <h1>Timeline</h1>
        </div>
        <RollingPosts app={this.props.app} user={this.props.app.authenticationContext.user.id} />;
      </>
    );
  }
}

export default Timeline;
