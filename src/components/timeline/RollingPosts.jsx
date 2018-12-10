import React, { Component } from "react";
import Posts from "./Posts";
import "./Posts.css";
import PostMapper from '../../data/PostMapper';

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
    this.postMapper = new PostMapper();
  }

  onDelete = (postId) => {
    this.postMapper.deletePost(postId).then(res => {
      if (res.status == 200) {
        this.setState({ loading: false, posts: this.state.posts.filter(p => p.id != postId) })
        this.props.toastrFactory().success("The post was deleted.");
        return;
      }

      this.props.toastrFactory().error("The post could not be deleted.");
    });
  }

  render() {
    return (
      <div>
        <Posts posts={this.state.posts} comments={this.props.comments} onDelete={this.onDelete} />
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
      window.innerHeight + document.documentElement.scrollTop >
      document.getElementById("top-container").clientHeight -
      document.getElementById("top-container").clientHeight / 7
    ) {
      this.isLoading = true;
      this.loadPosts(this.props.user);
    }
  };

  loadPosts = () => {
    this.props.fetch(this.props.user, this.cutoff, posts => {
      if (posts.length === 0) {
        this.hasMore = false;
        return;
      }
      this.setState(prevState => ({
        posts: prevState.posts.concat(posts)
      }), () => {
        this.isLoading = false;
      });

      this.cutoff = posts[posts.length - 1].id;
    });
  };
}

export default RollingPosts;
