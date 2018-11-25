import React, { Component } from "react";
import Posts from "./Posts";
import "./Posts.css";

class RollingPosts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };

    this.cutoff = null;
    this.hasMore = true;
    this.isLoading = false;

    window.onscroll = event => this.onScroll(event);
  }

  render() {
    return (
      <div>
        <Posts posts={this.state.posts} />
      </div>
    );
  }

  componentDidMount = () => {
    this.loadPosts();
  };

  onScroll = event => {

    if (
      this.isLoading === false &&
      this.hasMore &&
      window.innerHeight + document.documentElement.scrollTop > document.getElementById("top-container").clientHeight - document.getElementById("top-container").clientHeight / 10
    ) {
      this.loadPosts(this.props.user);
    }
  };

  loadPosts = () => {
    this.isLoading = true;
    this.props.fetch(this.props.user, this.cutoff, posts => {
      this.isLoading = false;
      if (posts.length === 0) {
        this.hasMore = false;
        return;
      }

      this.setState(prevState => ({
        posts: prevState.posts.concat(posts),
      }));

      this.cutoff = posts[posts.length - 1].id;
    });
  };
}

export default RollingPosts;
