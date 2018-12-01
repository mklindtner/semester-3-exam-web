import React, { Component } from "react";
import RollingPosts from "./RollingPosts";
import config from "../../config.js";
import { get } from "../../data/DataMapper.js";
import Header from "../header/Header";
import PaginatedComments from "../timeline/PaginatedComments";
import CommentMapper from "../../data/CommentMapper";

class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.commentMapper = new CommentMapper();
  }

  fetchTimeline = (user, cutoff, callback) => {
    get(
      config.restUrl + "posts/timeline/" + user + "/5" + (cutoff == null ? "" : ("?cutoff=" + cutoff))
    ).then(response => {
      if (response.status === 200) {
        callback(response.body);
        return;
      }

      callback([]);
    });
  };

  render() {
    return (
      <>
      <Header app={this.props.app} router={this.props.router} onLogout={this.props.onLogout} />
      <main id="timeline-page">
        <div className="row">
          <div className="col-xl">
            <h2>Timeline</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xl">
            <RollingPosts
              app={this.props.app}
              user={this.props.app.authenticationContext.user.id}
              fetch={this.fetchTimeline}
              comments={this.createCommentSection}
            />
          </div>
        </div>
      </main>
      </>
    );
  }

  onCommentSubmit = (postId, contents, resultCallback) => {
    this.commentMapper.createPostComment(postId, contents).then(response => {
        if(response.status === 201){
            this.props.toastrFactory().success("The comment was posted.");
            resultCallback(response.body);
            return;
        }

        this.props.toastrFactory().success("The comment was not posted.");
        resultCallback(false);
    })
}

createCommentSection = (postId) => {
    return <PaginatedComments 
    parent={postId}
    onCommentSubmit={(content, resultCallback) => this.onCommentSubmit(postId, content, resultCallback)} 
    pageSize={10}
    fetch={this.fetchComments}/>
}

fetchComments = (postId, pageSize, pageNumber, callback) => {
    
    const comments = this.commentMapper.getPostComments(postId, pageSize, pageNumber);
    const count = this.commentMapper.getPostCommentsCount(postId);
    
    Promise.all([comments, count]).then(results => {
  
            if(results[0].status === 200 && results[0].status === 200){
                callback(results[0].body, results[1]);
                return;
            }
            
            this.props.toastrFactory().error("Could not fetch comments.");
            callback([], 0);
    });
}
}

export default Timeline;
