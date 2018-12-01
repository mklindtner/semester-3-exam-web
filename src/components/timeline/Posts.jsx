import React from "react";
import Comments from "./Comments";
import Post from "./Post";

class Posts extends React.Component {

  render = () => {
    return this.props.posts.map(post => (
      <Post post={post} comments={this.props.comments}/>
    ));
  };
}

export default Posts;
