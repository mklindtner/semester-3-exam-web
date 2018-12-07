import React from "react";
import Comments from "./Comments";
import Post from "./Post";

class Posts extends React.Component {

  render = () => {
    return this.props.posts.map(post => (
      <Post key={post.id} post={post} posts={this.props.posts} comments={this.props.comments} clicked={this.props.clicked} {...this.props.children} />
    ));
  };
}

export default Posts;
