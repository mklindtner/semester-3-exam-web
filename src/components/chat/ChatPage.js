import React, { Component } from "react";
import config from "../../config.js";
import { get } from "../../data/DataMapper.js";
import Header from "../header/Header";
import ChatWindow from './ChatWindow';

class ChatPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
      <Header app={this.props.app} router={this.props.router} onLogout={this.props.onLogout} />
      <main id="chat-page">
        <div className="row">
          <div className="col-xl">
            <h2>Chat</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xl">
          <ChatWindow />
          </div>
        </div>
      </main>
      </>
    );
  }
}

export default ChatPage;
