import React, { Component } from "react";
import './HomePage.css'
import Header from "./header/Header";
import "./SettingsPage.css"

class SettingsPage extends Component {

    constructor(props) {
        super(props);
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
                    <div class="col-xs-3 tab-container">
                        <ul class="nav nav-tabs tabs-left sideways">
                            <li><a href="#profile-v" data-toggle="tab">Profile</a></li>
                        </ul>
                    </div>
                    <div class="col-xs-9">
                        <div class="tab-content">
                            <div class="tab-pane" id="profile-v">Profile Tab.</div>
                        </div>
                    </div>
                </div>
            </main >
            </>
        );
    }
}

export default SettingsPage;