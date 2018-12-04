import React from "react";

class SmallProfilePicture extends React.Component {
  render() {
    const styles = {
      width: this.props.width === undefined ? '50px' : this.props.width,
      height: this.props.height === undefined ? '50px' : this.props.height
    };

    if (
      this.props.user.profilePicture === undefined ||
      this.props.user.profilePicture.thumbnail === undefined
    )
      return (
        <img
          className="profile-picture small"
          style={styles}
          src="/pictures/smallProfilePicture.svg"
          alt={this.props.user.name}
        />
      );

    return (
      <img
        className="profile-picture small"
        style={styles}
        src={this.props.user.profilePicture.thumbnail}
        alt={this.props.user.name}
      />
    );
  }
}

export default SmallProfilePicture;
