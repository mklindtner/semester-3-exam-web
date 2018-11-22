import React from "react";
import Comments from "./Comments";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }
  render() {
    return (
      <>
        <div className="posts">{this.createPosts()}</div>
      </>
    );
  }

  createPosts = () => {
    return this.props.posts.map(post => (
      <div className="jumbotron col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <p>author: {post.author.name}</p>
        <p id="content">title: {post.title}</p>
        <p id="content">content: {post.contents}</p>
        <p>posted: {post.timeCreated}</p>

        <button
          className="btn btn-lg btn-success"
          data-toggle="collapse"
          href={"#collapseExample" + post.id}
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Comments
          <span class="glyphicon glyphicon-pencil" />
        </button>

        <div class="collapse" id={"collapseExample" + post.id}>
          <div class="container">
            <div class="row">
              <div class="col-md-6 col-md-offset-3">
                <textarea
                  placeholder="Comment something!"
                  class="pb-cmnt-textarea"
                />
                <form class="form-inline" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  clickHandler() {
    alert("I'm clicked!");
  }
}

export default Posts;
