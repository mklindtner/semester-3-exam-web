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
 
  deletePostHandler = (indexToDelete) => {
    console.log(this.state.posts)
    let currPosts = this.state.posts;
    currPosts.splice(indexToDelete, 1)
    this.setState({ posts: currPosts})
    console.log(this.state.posts)
  }

  render() {
    return (
      <div>
        <Posts posts={this.state.posts} comments={this.props.comments} clicked={this.deletePostHandler} />
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
