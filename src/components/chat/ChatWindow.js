import React, { Component } from "react";
import getAuthenticationContext from "../../getAuthenticationContext";

export default class ChatWindow extends Component {

    constructor(props) {
        super(props);
        const token = getAuthenticationContext().token;
        document.auth = 'X-Authorization=' + token + '; path=/';
        this.socket = new WebSocket(`ws://Bearer:${token}@localhost:8887`);
        this.socket.onopen = e => {
            this.socket.send({
                type: "text",
                payload: { "message": "Hello World!" }
            })
        }
    }

    render() {
        return <div>
            
        </div>
    }
}