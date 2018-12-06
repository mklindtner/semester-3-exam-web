import React, { Component } from "react";
import getAuthenticationContext from "../../getAuthenticationContext";
import ChatMapper from '../../data/ChatMapper';
import './ChatWindow.css';
import SmallProfilePicture from "../images/SmallProfilePicture";

export default class ChatWindow extends Component {

    constructor(props) {
        super(props);
        this.chatMapper = new ChatMapper();
        this.socket = this.createSocket();
        this.socket.onopen = () => this.send("authentication", { token: getAuthenticationContext().token });
        this.socket.onmessage = message => this.handleIncoming(JSON.parse(message.data));
        this.state = { friends: [], searchedFriends: [], show: null, messages: [] };
        this.userMap = {};
        this.userMap[getAuthenticationContext().user.id] = {
            user: getAuthenticationContext().user
        }

        this.fetchingMore = false;
        this.hasMore = true;
    }

    appendTextMessage = (payload) => {
        if (this.state.show != null) {
            if (this.state.show.user.id == payload.sender) {
                this.setState({ messages: this.state.messages.concat(payload) });
            }
        }
    }

    handleIncoming = (message) => {

        const type = message.type;
        if (type == 'message') {
            this.appendTextMessage(message.payload);
            return;
        }

        if (type == 'user-connected') {
            this.updateFriends(friend => {
                if (friend.user.id == message.payload.user) {
                    friend.online = true;
                }
                return friend;
            });
            return;
        }

        if (type == 'user-disconnected') {
            this.updateFriends(friend => {
                if (friend.user.id == message.payload.user) {
                    friend.online = false;
                }
                return friend;
            });
            return;
        }
    }

    updateFriends = (f) => {
        const friends = this.state.friends.map(f);
        const searchedFriends = this.state.searchedFriends.map(f);
        this.setState({ friends, searchedFriends });
    }

    createSocket = () => {
        return new WebSocket(`ws://localhost:8887`);
    }

    componentDidMount = () => {
        this.chatMapper.getFriends().then(response => {
            if (response.status === 200) {
                this.setState({ friends: response.body, searchedFriends: response.body });
                response.body.map(friend => {
                    this.userMap[friend.user.id] = friend;
                });
            }
        })
    }

    send = (type, object) => {
        object.type = type;
        this.socket.send(JSON.stringify(object));
    }

    onFriendSearch = (e) => {
        const value = e.currentTarget.value;
        this.setState({ searchedFriends: this.state.friends.filter(f => f.user.name.toLowerCase().startsWith(value.toLowerCase())) })
    }

    show = (friend) => {
        this.chatMapper.getHistory(friend.user.id, 25, null).then(response => {
            if (response.status === 200) {
                this.setState({ show: friend, messages: response.body }, () => {
                    var container = document.getElementById("chat-messages");
                    container.scrollTop = container.scrollHeight;
                    this.fetchingMore = false;
                    this.hasMore = true;
                });
                return;
            }

            alert("Could not fetch messages.");
        })
    }

    showFriends = () => {
        this.setState({ show: null });
    }

    onSendMessage = (e, user) => {
        e.preventDefault();

        const form = e.currentTarget;
        const message = {
            contents: form.message.value,
            receiver: user.id,
            sender: getAuthenticationContext().user.id
        };
        this.send("text", message);
        this.setState({ messages: this.state.messages.concat(message) })
    }

    fetchMore = (container) => {

        if (this.fetchingMore || !this.hasMore)
            return;

        const message = this.state.messages[0];
        if (message == undefined)
            return;

        this.fetchingMore = true;
        const beforeHeight = container.scrollHeight;
        this.chatMapper.getHistory(this.state.show.user.id, 25, message.id).then(response => {
    
            if (response.status === 200) {
                this.setState({ messages: response.body.concat(this.state.messages) }, () => {
                    if (response.body.length == 0)
                        this.hasMore = false;
                    const afterHeight = container.scrollHeight;
                    container.scrollTop = container.scrollTop + afterHeight - beforeHeight;
                });

                this.fetchingMore = false;
            }

        });
    }

    onScroll = (e) => {
        const scroll = e.currentTarget.scrollTop;
        if (scroll < 600) {
            this.fetchMore(e.currentTarget);
        }
    }

    render() {

        return (
            <div className="chat-window" >
                <ul className="chat-header">
                    {!this.state.show && <li>Your friends</li>}
                    {this.state.show && <li className="chat-control" onClick={this.showFriends}>Back</li>}
                    {this.state.show && <li className="chat-show-header">
                        <span className={this.state.show.online ? "chat-friend-status online" : "chat-friend-status offline"}></span>
                        <span className="chat-friend-name">{this.state.show.user.name}</span>
                    </li>}
                </ul>
                <div className="chat-content">
                    {!this.state.show &&
                        <div className="chat-friends-container">
                            <input placeholder="Search by name" type="search" class="chat-friend-search" onChange={this.onFriendSearch} />
                            <ul className="chat-friends-list">
                                {this.state.searchedFriends.map(friend =>
                                    <li key={friend.user.id} className={friend == this.state.show ? "chat-friends-item active" : "chat-friends-item"}
                                        onClick={() => this.show(friend)}>
                                        <span className={friend.online ? "chat-friend-status online" : "chat-friend-status offline"}></span>
                                        <span className="chat-friend-name">{friend.user.name}</span>
                                    </li>
                                )}
                            </ul>
                        </div>}
                    {this.state.show &&
                        <div className="chat-friend">
                            <div className="chat-messages-container col-xl-auto">
                                <ul id="chat-messages" className="chat-messages" onScroll={this.onScroll}>
                                    {this.state.messages.length < 1 &&
                                        <li className="chat-message">
                                            <p style={{ fontStyle: 'italic' }} className="chat-message-contents">No messages</p>
                                        </li>}
                                    {this.state.messages.map(message =>
                                        <li className={getAuthenticationContext().user.id == message.sender ? "chat-message sender" : "chat-message receiver"}>
                                            <div className="chat-message-profile">
                                                <SmallProfilePicture user={this.userMap[message.sender].user} />
                                                <p className="chat-message-author">{message.id} + {this.userMap[message.sender].user.name}</p>
                                            </div>
                                            <p className="chat-message-contents">{message.contents}</p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="chat-input-container">
                                <form className="chat-input-form" onSubmit={e => this.onSendMessage(e, this.state.show.user)} >
                                    <textarea placeholder="Send a message" name="message" className="chat-input-message" type="text" />
                                    <input name="submit" className="chat-input-submit" type="submit" />
                                </form>
                            </div>
                        </div>}
                </div>
            </div >
        )
    }
}