import React, { Component } from "react";

export default class SearchInput extends Component {
  state = {
    search: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.onSearchInputChange(this.state.search);
    });
  };

  render() {
    return (
      <div>
        <input
          name="search"
          className="form-control form-control-lg form-control-borderless"
          type="search"
          placeholder="Search user"
          onChange={this.onChange}
          value={this.state.search}
        />
      </div>
    );
  }
}
