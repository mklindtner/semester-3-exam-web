import React, { Component } from "react";
import RollingPosts from "./RollingPosts";
import config from "../../config.js";
import { get } from "../../data/DataMapper.js";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchTimeline = (user, cutoff, callback) => {
    get(config.restUrl + "posts/timeline/" + this.props.user + "/5" + cutoff
    ).then(response => {
      if (response.status === 200) {
        callback(response.body);
        return;
      }

      callback([]);
    });
  }

  render() {
    return (
      <>
      <div className="page-header container">
        <h1>Timeline</h1>
      </div>
      <RollingPosts app={this.props.app} user={this.props.app.authenticationContext.user.id} fetch={this.fetchTimeline} />
      </>
    );
  }
}

export default Timeline;
