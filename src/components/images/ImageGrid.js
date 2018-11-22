import React, { Component } from "react";
import { Link } from "react-router-dom";

class ImageGrid extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { title, images } = this.props;

        return (
            <div className="row image-grid-container">
                <p className="image-grid-title">{title}</p>
                <div className="image-grid">
                    {images.map(image =>
                        <div className="image-item">
                            <img src={image.uri} />
                        </div>
                    )};
                </div>
            </div>
        );
    }
}

export default ImageGrid;