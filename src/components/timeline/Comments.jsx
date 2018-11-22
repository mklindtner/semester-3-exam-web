import React from "react";
class Comments extends React.Component {
  render() {
    <>
      <div class="container pb-cmnt-container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-info">
              <div class="panel-body">
                <textarea
                  placeholder="Write your comment here!"
                  class="pb-cmnt-textarea"
                />
                <form class="form-inline">
                  <div class="btn-group">
                    <button class="btn" type="button">
                      <span class="fa fa-picture-o fa-lg" />
                    </button>
                    <button class="btn" type="button">
                      <span class="fa fa-video-camera fa-lg" />
                    </button>
                    <button class="btn" type="button">
                      <span class="fa fa-microphone fa-lg" />
                    </button>
                    <button class="btn" type="button">
                      <span class="fa fa-music fa-lg" />
                    </button>
                  </div>
                  <button class="btn btn-primary pull-right" type="button">
                    Share
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>;
  }
}
