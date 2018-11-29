import React, { Component } from "react";
import config from "../../config.js";
import Users from "./Users";
import SearchInput from "./SearchInput";

export default class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  fetch = async input => {
    let result = await fetch(config.restUrl + "users/search?name=" + input);
    let users = await result.json();
    console.log(users);
    this.setState({
    users
    });
  };

  render() {
    return (
      <div className="">
        <SearchInput onSearchInputChange={this.fetch} />
        <Users users={this.state.users} width={this.props.hitBoxWidth} />
      </div>
    );
  }
}
