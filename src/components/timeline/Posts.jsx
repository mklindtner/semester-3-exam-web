import React, { Component } from "react";
import { get } from "../../data/DataMapper.js";
import "./Posts.css";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: []};
  }

  render() {
    console.log(this.state.posts);
    return (
      <>
        <h1 className="center">I am the Posts component</h1>
        {this.createPosts()}
        
      </>
    );
  }

  createPosts = () => {
    return this.state.posts.map(post => (
      <div className="jumbotron col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <p>author: {post.author.name}</p>
        <p id="content">{post.title}</p>
        <p id="content">{post.contents}</p>
        <p>posted: {post.timeCreated}</p>
        <p>{this.props.children}</p>
      </div>
    ))}
  componentDidMount = () => {
    console.log("i mounted!")
    this.getPosts(1);
    console.log(this.props.user);
  };

  getPosts = id => {
    return get("http://localhost:8080/ca3/api/posts/timeline/"+1+"/"+5+"?cutoff="+ 10).then(
      response => {
        this.setState({ posts: response.body });
      }
    );
  };
}

export default Posts;
