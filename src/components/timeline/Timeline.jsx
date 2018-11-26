import React, { Component } from "react";
import RollingPosts from "./RollingPosts";
import Header from "../header/Header";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return (
      <>
        <Header app={this.props.app} router={this.props.router} />
        <main>
          <div className="page-header container">
            <h1>Timeline</h1>
          </div>
          <RollingPosts app={this.props.app} />;
        </main>
      </>
    );
  }
}

export default Timeline;
