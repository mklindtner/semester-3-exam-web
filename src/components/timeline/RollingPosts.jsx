import React, { Component } from "react";
import { get } from "../../data/DataMapper.js";
import Posts from "./Posts";
import "./Posts.css";
import config from "../../config.js";

class RollingPosts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      hasMore: true,
      cutoff: null
    };

    this.isLoading = false;

    window.onscroll = event => {
      let element = event.currentTarget;
      if (
        this.isLoading === false &&
        this.state.hasMore &&
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
    this.loadPosts(this.props.app.authenticationContext.user.id);
  };

  onScroll = event => {
    let element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.loadPosts();
    }
  };

  loadPosts = id => {
    const cutoff =
      this.state.cutoff == null ? "" : "?cutoff=" + this.state.cutoff;
    this.isLoading = true;
    get(config.restUrl + "posts/timeline/" + id + "/5" + cutoff
    ).then(response => {
      this.isLoading = false;
      if (response.body.length === 0) {
        this.setState({ hasMore: false });
        return;
      }

      console.log(response.body.map(post => post.id));

      this.setState(prevState => ({
        posts: prevState.posts.concat(response.body),
        cutoff: response.body[response.body.length - 1].id
      }));
    });
  };
}

export default RollingPosts;
