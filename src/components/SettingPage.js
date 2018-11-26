import React, { Component } from "react";
import './HomePage.css'
import Header from "./header/Header";
import "./SettingsPage.css"
import ProfileImageForm from './images/ProfileImageForm';
import UserMapper from '../data/UserMapper';
import getAuthenticatedUser from "../getAuthenticatedUser";

class SettingsPage extends Component {

    constructor(props) {
        super(props);
    
        this.userMapper = new UserMapper();
    }

    onProfileUpdate = (image) => {
        this.userMapper.updateProfileImage(getAuthenticatedUser().id, image).then(response => {
            if(response.status === 200){
                this.props.toastrFactory().success("Updated profile picture.");
                return;
            }

            this.props.toastrFactory().error("Could not update profile picture.");
        });
    }

    render = () => {
        return (
            <>
            <Header app={this.props.app} router={this.props.router} onLogout={this.props.onLogout} />
            <main id="settings-page">
                <div className="row">
                    <div className="col-xl">
                        <h2>Settings</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-3 tab-container">
                        <ul className="nav nav-tabs tabs-left sideways">
                            <li><a href="#profile-v" data-toggle="tab">Profile</a></li>
                        </ul>
                    </div>
                    <div className="col-xs-9">
                        <div className="tab-content">
                            <div className="tab-pane" id="profile-v">
                                <ProfileImageForm onSubmit={this.onProfileUpdate}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
            </>
        );
    }
}

export default SettingsPage;