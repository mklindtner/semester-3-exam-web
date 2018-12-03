import React from "react";
import './Comments.css';
import CommentMapper from '../../data/CommentMapper';

class Comments extends React.Component {

  constructor(props){
    super(props)

    this.commentMapper = new CommentMapper();
 
  }

deleteCommentHandler = (id) =>{
  console.log(id);
  this.commentMapper.deletePostComments(id);
}

  render() {

    return (
      <ul className="comments">
        {this.props.comments.map(comment =>
          <li className="comment" key={comment.id}>
            <div className="comment-header">
              <p className="comment-author-name">{comment.author.name}</p>
            </div>
            <p className="comment-content">{comment.contents}</p>
            <button onClick={() => this.deleteCommentHandler(comment.id)}>orale </button>
          </li>
        )}
      </ul>
    );
  }
}

export default Comments;
