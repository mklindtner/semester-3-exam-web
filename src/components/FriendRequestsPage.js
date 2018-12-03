import React, { Component } from "react";
import Header from "./header/Header";

import UserMapper from "../data/UserMapper";
import getAuthenticationContext from "../getAuthenticationContext";
import LargeProfilePicture from './images/LargeProfilePicture';
import './FriendRequestsPage.css';

export default class FriendRequestsPage extends Component {

    constructor(props) {
        super(props);

        this.userMapper = new UserMapper();
        this.state = {
            requests: []
        }
    }

    update = () => {
        this.userMapper.getReceivedFriendRequests(getAuthenticationContext().user.id).then(response => {
            if (response.status === 200) {
                this.setState({ requests: response.body });
                return;
            }

            this.props.toastrFactory().error("Could not retrieve friend requests.");
        })
    }

    componentDidMount = () => {
        this.update()
    }

    onReject = (request) => {
        this.userMapper.rejectFriendRequest(request).then(response => {
            if(response.status === 200){
                this.props.toastrFactory().success("The friend request was rejected.");
                this.update();
                return;
            }

            this.props.toastrFactory().error("An error occurred.");
        });
    }

    onAccept = (request) => {
        this.userMapper.acceptFriendRequest(request).then(response => {
            if(response.status === 201){
                this.props.toastrFactory().success("The friend request was accepted.");
                this.update();
                return;
            }

            this.props.toastrFactory().error("An error occurred.");
        });
    }

    render() {

        return (
            <>
            <Header app={this.props.app} router={this.props.router} onLogout={this.props.onLogout} />
            <main id="settings-page">
                <div className="row">
                    <div className="col-xl">
                        <h2>Friend requests</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-3 tab-container">
                        {this.state.requests.length < 1 ? <p>No new friend requests</p> :
                            <div>
                                {this.state.requests.map(request =>
                                    <div key={request.id} className="friend-request">
                                        <div className="friend-request-sender">
                                            <LargeProfilePicture width="100px" height="100px" user={request.requester} />
                                            <p className="friend-request-name">{request.requester.name}</p>
                                        </div>
                                        <div className="friend-request-actions">
                                            <button className="accept" onClick={() => this.onAccept(request.id)}>Accept</button>
                                            <button className="reject" onClick={() => this.onReject(request.id)}>Reject</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                </div>
            </main >
            </>
                    );
    }
}