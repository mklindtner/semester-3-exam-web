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
    this.hasMap = true;
    this.isLoading = false;

    window.onscroll = event => {
      let element = event.currentTarget;
      if (
        this.isLoading === false &&
        this.hasMore &&
        window.innerHeight + document.documentElement.scrollTop >
        document.documentElement.offsetHeight - 200
      ) {
        this.loadPosts(this.props.user);
      }
    };
  }

  render() {
    return (
      <div onScroll={this.onScroll}>
        <Posts posts={this.state.posts} />
      </div>
    );
  }

  componentDidMount = () => {
    this.loadPosts();
  };

  onScroll = event => {
    let element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.loadPosts();
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
