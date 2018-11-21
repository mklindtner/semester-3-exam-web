import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserMapper from "../../data/UserMapper";

class ProfilePage extends Component {

    constructor(props) {
        super(props);

        this.userMapper = new UserMapper();
        this.state = { user: null };
    }

    componentDidMount() {

        let userToRetrieve = this.props.app.authenticationContext.user.id;
        if (this.props.router.match.params.user != undefined)
            userToRetrieve = this.props.router.match.params.user;

        this.userMapper.getUser(userToRetrieve).then(response => {
            if (response.status === 200)
                this.setState({ user: response.body });
        });

    }

    render() {
        return (
            <div id="profile-page" className="row">
                {this.state.user !== null &&
                    <div>
                        <h2>{this.state.user.name} Profile</h2>
                    </div>}
            </div>
            );
    }
}

export default ProfilePage;