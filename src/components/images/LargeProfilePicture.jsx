import React from 'react';

class LargeProfilePicture extends React.Component {

    render() {
            const styles = {
              width: this.props.width == undefined ? '250px' : this.props.width,
              height: this.props.height == undefined ? '250px' : this.props.height
            };
        
            if (this.props.user.profilePicture == undefined || this.props.user.profilePicture.thumbnail == undefined)
              return <img className="profile-picture large" style={styles} src="/pictures/largeProfilePicture.svg" alt={this.props.user.name} />
        
            return <img className="profile-picture large" style={styles} src={this.props.user.profilePicture.full} alt={this.props.user.name} />
    }
}

export default LargeProfilePicture;