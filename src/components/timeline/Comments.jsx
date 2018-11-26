import React from "react";
class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
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
          <div class="row">
          <input className="btn"></input>
          </div>
        </div>
      </>
    );
  }
}

export default Comments;
