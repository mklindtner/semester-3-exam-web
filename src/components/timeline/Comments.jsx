import React from "react";
import './Comments.css';
import CommentMapper from '../../data/CommentMapper';
import {Button} from 'react-bootstrap'

class Comments extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      loading: false
    }
    this.commentMapper = new CommentMapper();
 
  }

deleteCommentHandler = (id) =>{
  console.log(id);
  this.setState({
    loading: true
  })
  this.commentMapper.deletePostComments(id).then(res =>{
    this.setState({loading: false})
  });
}

  render() {

    return (
      <ul className="comments">
        {this.props.comments.map(comment =>
          <li className="comment" key={comment.id}>
            <div className="comment-header">
              <p className="comment-author-name">{comment.author.name}</p>
              <Button 
            className="btn delete-btn"
            disabled={this.state.loading}
             onClick={() => this.deleteCommentHandler(comment.id)}>
             {this.state.loading ? 'Deleting comment': 'Delete'}
            </Button>
            <Button 
            className="btn edit-btn"
            disabled={this.state.loading}
             onClick={() => this.deleteCommentHandler(comment.id)}>
             {this.state.loading ? 'Editing comment': 'Edit'}
            </Button>
            </div>
            <p className="comment-content">{comment.contents}</p>
            
          </li>
        )}
      </ul>
    );
  }
}

export default Comments;
