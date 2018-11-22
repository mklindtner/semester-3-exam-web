import React, { Component } from "react";
import Posts from "./Posts";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(props.app.authenticationContext);
  }

  componentDidMount = () => {
    console.log("i am timelines props:")
    console.log(this.props);
  };
  render() {
    return( <>
    <div className="page-header container">
      <h1>I am the timeline component!</h1>
      </div>
      <p>
        <a href="#" className="btn btn-default btn-lg" role="button">More info</a>
      </p>
      <div className="btn-group btn-lg">
      <button type="submit" className="btn btn-danger" value="sup" name="sup">
      <span className="glyphicon glyphicon-bitcoin"></span>BitcoinBtn
      <span className="glyphicon glyphicon-bitcoin"></span></button>
      <input type="button" className="btn btn-info" value="button"></input>
      </div>
      <Posts user={this.props.app} />;
      </>)
  }
}

export default Timeline;
