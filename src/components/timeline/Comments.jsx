import React from "react";
import './Comments.css';

class Comments extends React.Component {

  render() {

    return (
      <ul className="comments">
        {this.props.comments.map(comment =>
          <li className="comment" key={comment.id}>
            <div className="comment-header">
              <p className="comment-author-name">{comment.author.name}</p>
            </div>
            <p className="comment-content">{comment.contents}</p>
          </li>
        )}
      </ul>
    );
  }
}

export default Comments;
