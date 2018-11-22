import React, { Component } from "react";
import { get } from "../../data/DataMapper.js";
import Posts from "./Posts";
import "./Posts.css";

class RollingPosts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  render() {
    return (
      <>
        <Posts posts={this.state.posts} />
      </>
    );
  }

  componentDidMount = () => {
    this.getPosts(this.props.app.authenticationContext.user.id);
  };

  getPosts = id => {
    return get(
      "http://localhost:8080/ca3/api/posts/timeline/" + id + "/5"
    ).then(response => {
      this.setState({ posts: response.body });
    });
  };
}

export default RollingPosts;
