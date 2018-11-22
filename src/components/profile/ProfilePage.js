import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserMapper from "../../data/UserMapper";
import { Tabs, Tab } from "react-bootstrap";
import Header from "../header/Header";

class ProfilePage extends Component {

    constructor(props) {
        super(props);

        this.userMapper = new UserMapper();
        this.state = { user: null, posts: [], images: [], friends: [] };
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
            <>
            <Header app={this.props.app} router={this.props.router} />
            <main>
                <div id="profile-page">
                    {this.state.user != null && <div id="profile-page" className="row">
                        <div className="row">
                            <div className="col-xl">
                                <h2>{this.state.user.name}' Profile</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl">
                                <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                                    <Tab eventKey={1} title="Posts">
                                        <p>Posts</p>
                                    </Tab>
                                    <Tab eventKey={2} title="Images">
                                        <p>Images</p>
                                    </Tab>
                                    <Tab eventKey={3} title="Friends">
                                        <p>Friends</p>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>}
                </div>
            </main>
            </>
        );
    }
}

export default ProfilePage;