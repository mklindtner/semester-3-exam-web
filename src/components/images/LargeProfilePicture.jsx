import React from 'react';

class LargeProfilePicture extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        return <img src="/pictures/largeProfilePicture.svg" alt="picture of your friend" />
    }
}

export default LargeProfilePicture;