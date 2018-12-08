import React from "react";
import './Comments.css';
import CommentMapper from '../../data/CommentMapper';
import {Button} from 'react-bootstrap'
import { Picker, Emoji } from 'emoji-mart'
import Modal from '../UI/Modal/Modal'
import 'emoji-mart/css/emoji-mart.css'
import { number } from "prop-types";

class SingleComment extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      loading: false,
      showModal: false,
      showEmoji: false,
      emojis: []
      /*emoji: {  //for single emoji
          id: '',
          count: 1
      }*/
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

addEmoji = (newEmoji) =>{
// mark if new emoji is already in the array or not
let containsNewEmoji = false;

// recreate emojis array
let newEmojis = this.state.emojis.map(emoji => {
  // if emoji already there, simply increment count
  if (emoji.id === newEmoji.id) {
    containsNewEmoji = true;

    return { 
      ...newEmoji,
      ...emoji,
      count: emoji.count + 1,
    };
  }

  // otherwise return a copy of previos emoji
  return {
    ...emoji
  };
});

// if newEmoji was not in the array previously, add it freshly
if (!containsNewEmoji) {
  newEmojis = [...newEmojis, {...newEmoji, count: 0}];
}

// set new state
this.setState({ emojis: newEmojis, 
showEmoji: true});
}
/*
increment = (newEmoji) =>{
  console.log(newEmoji)
  let count = newEmoji.count+1
  newEmoji.count = count;
  console.log(newEmoji.count)
 this.setState(   
   {newEmoji}
 )
 console.log(newEmoji)
}
*/
closeModalHandler = () =>
    this.setState({showModal: false});

  render() {
    const {comment} = this.props;
    console.log(this.state.emojis)
   console.log(this.state.showEmoji)

   const EmojiCount = (props)  => {
    return (
      <div>
        <Emoji key={props.index} onClick={this.addEmoji} tooltip={true}
            emoji={{id: props.emoji.id, skin: 1}} size={25}  />
        <div>{props.count}</div>
        </div>
    );
  }
  
   

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
             {this.state.showEmoji && this.state.emojis &&
            <div className="emoji">
            {this.state.emojis && 
            this.state.emojis.map( (emoji, index) =>{
            return(
            <div className="emoji">
             <EmojiCount key={index} onClick={this.addEmoji} tooltip={true}
             emoji={{id: emoji.id, skin: 1}} size={25} count={emoji.count} />
             </div>
            )
            })  
            }
            </div>
             }
            {/*
            <Emoji onClick={this.increment} tooltip={true}
            emoji={{id: this.state.emoji.id, skin: 1}} size={25} />}
            <p>{this.state.emoji.count}</p>
            </div>
            */}
            <p className="comment-content">{comment.contents}</p>
          </li>
        
      </ul>
    );
  }
}

export default SingleComment;
