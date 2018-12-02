import React, { Component } from "react";
import RollingPosts from "./RollingPosts";
import config from "../../config.js";
import { get } from "../../data/DataMapper.js";
import Header from "../header/Header";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchTimeline = (user, cutoff, callback) => {
    get(
      config.restUrl + "posts/timeline/" + user + "/5" + (cutoff == null ? "" : ("?cutoff=" + cutoff))
    ).then(response => {
      if (response.status === 200) {
        callback(response.body);
        return;
      }

      callback([]);
    });
  };

  render() {
    return (
      <>
      <Header app={this.props.app} router={this.props.router} onLogout={this.props.onLogout} />
      <main id="timeline-page">
        <div className="row">
          <div className="col-xl">
            <h2>Timeline</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xl">
            <RollingPosts
              app={this.props.app}
              user={this.props.app.authenticationContext.user.id}
              fetch={this.fetchTimeline}
            />
          </div>
        </div>
      </main>
      </>
    );
  }
}

export default Timeline;
