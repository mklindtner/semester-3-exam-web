import React from "react";
import Comments from "./Comments";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }
  render = () => {
    return (
      <>
        <div className="posts">{this.createPosts()}</div>
      </>
    );
  }

  createPosts = () => {
    return this.props.posts.map(post => (
      <div className="container jumbotron col-lg-12 col-md-12 col-sm-12 col-xs-12" key={post.id}>
        <div className="row">
          <p className="col-lg-3 col-md-4 col-sm-6 col-xs-12">author: {post.author.name}</p>
          <p className="col-lg-3 col-md-4 col-sm-6 col-xs-12">posted: {post.timeCreated}</p>
        </div>
        <p className="">title: {post.title}</p>
        <p className="">content: {post.contents}</p>

        <button
          className="btn btn-lg btn-success"
          data-toggle="collapse"
          href={"#collapseExample" + post.id}
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Comments
          <span className="glyphicon glyphicon-pencil" />
        </button>

        <div className="collapse" id={"collapseExample" + post.id}>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <textarea
                  placeholder="Comment something!"
                  className="pb-cmnt-textarea"
                />
                <form className="form-inline" />
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
