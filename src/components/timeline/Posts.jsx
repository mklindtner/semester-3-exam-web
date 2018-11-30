import React from "react";
import Comments from "./Comments";


class Posts extends React.Component {
  
  render = () => {
    return this.props.posts.map(post => (
      <div
        className="post"
        key={post.id}
      >
        <div className="clear-fix">
          <p className="author">{post.author.name}</p>
          <p className="created">{post.timeCreated}</p>
        </div>
        <p className="contents">{post.contents}</p>
        {this.props.comments != null && this.props.comments}
      </div >
    ));
  };
}

export default Posts;
