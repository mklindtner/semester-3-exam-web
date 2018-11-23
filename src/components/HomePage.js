import React, { Component } from "react";
import './HomePage.css'

class HomePage extends Component { 

    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div id="homepage-container">
                {this.props.component !== undefined && <div id="right-component">
                    {this.props.component()}
                </div>}
            </div>
        );
    }
}

export default HomePage;