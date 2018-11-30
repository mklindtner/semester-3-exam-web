import React from 'react';

class LargeProfilePicture extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        if(this.props.image === null){
        return <img src="/pictures/largeProfilePicture.svg" alt="picture of your friend" />
        } else {
            return <img src={this.props.image} alt="picture of your friend" />
        }
    }
}

export default LargeProfilePicture;