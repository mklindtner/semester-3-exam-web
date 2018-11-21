import React, { Component } from "react";
import { get } from "../../data/DataMapper.js";
import "./Posts.css";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], offset: 0 };
  }

  render() {
    return (
      <>
        <h1 className="center">I am the Posts component</h1>
        {this.state.posts.map(post => (
          <div className="jumbotron">
            <p>author: {post.author.name}</p>
            <p id="content">{post.title}</p>
            <p id="content">{post.contents}</p>
            <p>posted: {post.timeCreated}</p>
          </div>
        ))}
      </>
    );
  }

  componentDidMount = () => {
    this.getPosts(1);
  };

  getPosts = id => {
    return get("http://localhost:8080/ca3/api/posts/timeline/" + id).then(
      response => {
        this.setState({ posts: response.body });
      }
    );
  };
}

export default Posts;
