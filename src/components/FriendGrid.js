import React from "react";
import './FriendGrid.css';

class FriendGrid extends React.Component {

  render = () => {
    return (

      <div className="col-12 friend-grid-container">
        <div className="row text-center text-lg-left">
          {this.props.friends.map(friend =>
            <div key={friend.id} className="col-lg-3 col-md-4 col-xs-6">
              <a href={"profile/" + friend.id} className="d-block mb-4 h-100">
                <img className="img-fluid img-thumbnail" src={friend.profilePicture.src} alt={friend.name} />
                <p>{friend.name}</p>
              </a>
            </div>
          )};
        </div>
      </div>
    )
  }
}

export default FriendGrid;
