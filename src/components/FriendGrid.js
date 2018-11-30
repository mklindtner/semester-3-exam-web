import React from "react";
import './FriendGrid.css';
import LargeProfilePicture from '../components/images/LargeProfilePicture';

class FriendGrid extends React.Component {
constructor(props){
  super(props);
}
  render = () => {
    return (
      <div className="col-12 friend-grid-container">
        <div className="row text-center text-lg-left">
          {this.props.friends.map(friend => 
            <div key={friend.id} className="col-lg-3 col-md-4 col-xs-6">
              <a href={"profile/" + friend.id} className="d-block mb-4 h-100">
              <LargeProfilePicture image={friend.profilePicture} alt={friend.name} />
                <p>{friend.name}</p>
              </a>
            </div>
          )};
        </div>
      </div>
    )
  }

  controlIfProfilePictureExists = content => {
  if(content === null){
    return LargeProfilePicture;
  }
}
}

export default FriendGrid;
