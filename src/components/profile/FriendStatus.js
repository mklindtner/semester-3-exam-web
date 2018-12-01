import React, { Component } from "react";
import UserMapper from '../../data/UserMapper';
import getAuthenticatedUser from "../../getAuthenticatedUser";

import './FriendStatus.css'

export default class FriendStatus extends Component {

    constructor(props) {
        super(props);

        this.identity = getAuthenticatedUser();
        this.userMapper = new UserMapper();
        this.state = {
            friendship: undefined,
            sent: false
        }
    }

    componentDidMount = () => {

        const request = this.userMapper.getSentFriendRequest(this.props.other);
        const friendship = this.userMapper.getFriendship(this.props.other);

        Promise.all([request, friendship]).then(results => {
            this.setState({
                sent: results[0].status === 200 ? true : false,
                friendship: results[1].status == 200 ? results[1].body : null
            })
        });
    }

    sendFriendRequest = () => {
        this.userMapper.sendFriendRequest(this.props.other).then(response => {
            if (response.status === 201) {
                this.props.toastrFactory().success("The friend request was sent.");
                this.setState({ sent: true })
                return;
            }

            this.props.toastrFactory().error("The friend request could not be sent.");
        });
    }

    render() {

        if (this.identity.id === this.props.other)
            return null;

        return (
            <div className="friend-status">
                {this.getContents()}
            </div>
        )
    }

    getContents = () => {

        if (this.state.friendship){
            const since = new Date(this.state.friendship.since);
            const formatted = `${since.getFullYear()}-${since.getMonth() + 1}-${since.getUTCDate()}`;
            return <p>Friends since {formatted}</p>
        }

        if (this.state.sent === true)
            return <p>Request pending</p>

        return <button onClick={this.sendFriendRequest}>Send friend request</button>
    }
}