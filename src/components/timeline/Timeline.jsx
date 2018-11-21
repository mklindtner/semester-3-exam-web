import React, { Component } from "react";
import Posts from "./Posts";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(props.app.authenticationContext);
  }
  render() {
    return <Posts />;
  }
}

export default Timeline;
