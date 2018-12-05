import React, { Component } from "react";
import getAuthenticationContext from "../../getAuthenticationContext";
import ChatMapper from '../../data/ChatMapper';
import './ChatWindow.css';

export default class ChatWindow extends Component {

    constructor(props) {
        super(props);
        this.chatMapper = new ChatMapper();
        this.socket = this.createSocket();
        this.socket.onopen = () => this.send("authentication", { token: getAuthenticationContext().token });
        this.socket.onmessage = message => this.handleIncoming(JSON.parse(message.data));
        this.state = { friends: [], searchedFriends: [], show: null, messages: [] };
    }

    handleIncoming = (message) => {
        const type = message.type;
        console.log(message);
        if (type == 'message') {
            return;
        }

        if (type == 'user-connected') {
            this.updateFriends(friend => {
                if (friend.user.id == message.payload.user) {
                    friend.online = true;
                    console.log(friend);
                }
                return friend;
            });
            return;
        }

        if (type == 'user-disconnected') {
            this.updateFriends(friend => {
                if (friend.user.id == message.payload.user) {
                    friend.online = false;
                    console.log(friend);
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
                this.setState({ show: friend, messages: response.body });
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
        const message = form.message.value;
        this.send("text", {
            contents: message,
            receiver: user.id
        });
    }

    render() {

        return (
            <div className="chat-container">
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
                                <ul className="chat-messages-list">
                                    <li className="chat-messages-item">

                                    </li>
                                </ul>
                            </div>
                            <div className="chat-input-container">
                                <form className="chat-input-form" onSubmit={e => this.onSendMessage(e, this.state.show.user)} >
                                    <input name="message" className="chat-input-message" type="text" />
                                    <input name="submit" className="chat-input-submit" type="submit" />
                                </form>
                            </div>
                        </div>}
                </div>
            </div>
        )
    }
}