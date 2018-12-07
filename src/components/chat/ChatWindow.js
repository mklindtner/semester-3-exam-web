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
        this.state = { friends: [], searchedFriends: [], show: null, messages: [], search: null };
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
            if (this.state.show && this.state.show.user.id == message.payload.sender)
                this.appendTextMessage(message.payload);
            else {
                this.userMap[message.payload.sender].unreadMessages++;
                this.updateStateFromUserMap();
            }
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
        this.search(e.currentTarget.value);
    }

    search(term) {
        this.setState({ search: term, searchedFriends: this.state.friends.filter(f => f.user.name.toLowerCase().startsWith(term.toLowerCase())) })
    }

    updateStateFromUserMap = () => {
        const authed = getAuthenticationContext().user.id;
        this.setState({ friends: Object.values(this.userMap).filter(f => f.user.id != authed) }, () => {
            if(this.state.search)
                this.search(this.state.search);
        });
    }

    show = (friend) => {
        this.chatMapper.getHistory(friend.user.id, 25, null).then(response => {
            if (response.status === 200) {
                this.setState({ show: friend, messages: response.body }, () => {
                    var container = document.getElementById("chat-messages");
                    this.userMap[friend.user.id].unreadMessages = 0; // Produces errors when all unread messages has not been retrieved.
                    this.updateStateFromUserMap();
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
                <div className="chat-content">

                    <div className="chat-friends-container">
                        <input placeholder="Search by name" type="search" className="chat-friend-search" onChange={this.onFriendSearch} />
                        <ul className="chat-friends-list">
                            {this.state.searchedFriends.map(friend =>
                                <li key={friend.user.id} className={friend == this.state.show ? "chat-friends-item active" : "chat-friends-item"}
                                    onClick={() => this.show(friend)}>
                                    <span className={friend.online ? "chat-friend-status online" : "chat-friend-status offline"}></span>
                                    <span className="chat-friend-name">{friend.user.name}</span>
                                    {friend.unreadMessages != 0 && <span className="chat-friend-unread">{friend.unreadMessages} new</span>}
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="chat-friend">
                        {this.state.show && 
                        <>
                            <div className="chat-messages-container col-xl-auto">
                                <ul id="chat-messages" className="chat-messages" onScroll={this.onScroll}>
                                    {this.state.messages.length < 1 &&
                                        <li className="chat-message">
                                            <p style={{ fontStyle: 'italic' }} className="chat-message-contents">No messages</p>
                                        </li>}
                                    {this.state.messages.map((message, index) =>
                                        <li key={message.id ? message.id : index} className={getAuthenticationContext().user.id == message.sender ? "chat-message sender" : "chat-message receiver"}>
                                            <div className="chat-message-profile">
                                                <SmallProfilePicture user={this.userMap[message.sender].user} />
                                                <p className="chat-message-author">{this.userMap[message.sender].user.name}</p>
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
                            </>}
                        </div>
                </div>
            </div >
        )
    }
}