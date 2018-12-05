import React from "react";
import './Comments.css';
import CommentMapper from '../../data/CommentMapper';
import {Button} from 'react-bootstrap'
import { Picker, Emoji } from 'emoji-mart'
import Modal from '../UI/Modal/Modal'
import 'emoji-mart/css/emoji-mart.css'

class SingleComment extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      loading: false,
      comments: this.props.comments,
      showModal: false,
      showEmoji: true,
      emoji: {
          id: '',
          count: 0
      }
    }
   
    this.commentMapper = new CommentMapper();
 
  }

  

  componentDidMount(){
    console.log(this.props.comments)
    console.log(this.state.emojis)
  }

deleteCommentHandler = (id) =>{
  console.log(id);
  this.setState({
    loading: true
  })
 
  this.commentMapper.deletePostComments(id).then(res =>{
    this.setState({loading: false})
    console.log('hwhwhwh');
  });
  let indexToDelete = this.props.comments.findIndex((comment) =>{
    return comment.id === id;
  });
 this.props.clicked(indexToDelete)
 console.log('we are here')

}

addEmoji = (emoji) =>{
    console.log(emoji.id)
    let selectedEmoji = {
        id: emoji.id
    }
    this.setState({emoji: selectedEmoji })
    console.log(this.state.emoji)
}


closeModalHandler = () =>
    this.setState({showModal: false});

  render() {
    const {comment} = this.props;

    return (
      <ul className="comments">
          <li className="comment" key={comment.id}>
            <div className="comment-header">
              <p className="comment-author-name">{comment.author.name}</p>
              <Button 
            className="btn-comment delete-btn"
            disabled={this.state.loading}
             onClick={() => this.deleteCommentHandler(comment.id)}>
             {this.state.loading ? 'Deleting comment': 'Delete'}
            </Button>
            <Button 
            className="btn-comment edit-btn"
            disabled={this.state.loading}
             onClick={() => this.deleteCommentHandler(comment.id)}>
             {this.state.loading ? 'Editing comment': 'Edit'}
            </Button>
            <button onClick={() => this.setState({showModal: true}) }>add emojis</button>
            <Modal show={this.state.showModal} onClose={this.closeModalHandler}>
            <Picker onSelect={this.addEmoji} showPreview={false } style={{ bottom: '10px', right: '10px' }} />
            </Modal>
            </div> 
             {this.state.showEmoji &&
            <div className="emoji">
            <Emoji /*onClick={() => this.setState(prevState => ({
                emoji: {
                    ...prevState.emoji,
                    count: prevState.count+1
                }     
            }))}*/
            emoji={{ id: this.state.emoji.id, skin: 1, }} size={25} />
            <p>{this.state.emoji.count}</p>
            </div>
            }
            <p className="comment-content">{comment.contents}</p>
          </li>
        
      </ul>
    );
  }
}

export default SingleComment;
