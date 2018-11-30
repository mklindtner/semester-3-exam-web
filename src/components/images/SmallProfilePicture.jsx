import React from "react";

class SmallProfilePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.picture = profilePictureBlack;
  }

  componentDidMount() {}

  render() {
    if(this.props.image === null){
        return <img src="/pictures/smallProfilePicture.svg" alt="picture of your friend" />
        } else {
            return <img src={this.props.image} alt="picture of your friend" />
        }
  }
}

export default SmallProfilePicture;
