import React from "react";
import './Comments.css';
import CommentMapper from '../../data/CommentMapper';
import {Button} from 'react-bootstrap'
import SingleComment from './Comment'

class Comments extends React.Component {
  render(){  

  return (
    <ul className="comments">
      {this.props.comments.map(comment =>
        <SingleComment key={comment.id} comment={comment} clicked={this.props.deleteCommentHandler} {...this.props}/>
      )}
    </ul>
  )
      }
    }
export default Comments;
