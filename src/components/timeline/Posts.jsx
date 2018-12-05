import React from "react";
import Comments from "./Comments";
import Post from "./Post";

class Posts extends React.Component {

  componentDidMount(){
    console.log('from posts the props are: ' + this.props.clicked)
  }

  render = () => {
    return this.props.posts.map(post => (
      <Post key={post.id} post={post} posts={this.props.posts} comments={this.props.comments} clicked={this.props.clicked} {...this.props.children} />
    ));
  };
}

export default Posts;
