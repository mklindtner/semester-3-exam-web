import React from "react";
import smallProfilePicture from "../../../public/pictures/smallProfilePicture";

class SmallProfilePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.picture = profilePictureBlack;
  }

  componentDidMount() {}

  render() {
    return smallProfilePicture;
  }
}

export default SmallProfilePicture;
