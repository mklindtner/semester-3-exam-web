import React from "react";
import './FriendGrid.css';
import LargeProfilePicture from '../components/images/LargeProfilePicture';

const friendGrid  = (props) => {

    return (
      <div className="col-12 friend-grid-container">
        <div className="row text-center text-lg-left">
          {props.friends.map(friend =>
            <div key={friend.id} className="col-lg-3 col-md-4 col-xs-6">
              <a href={"/profile/" + friend.id} className="d-block mb-4 h-100">
                <LargeProfilePicture user={friend} width="200px" height="200px"/>
                <p className="friend-name">{friend.name}</p>
              </a>
            </div>
          )};
        </div>
      </div>
    )
  }


export default friendGrid;
