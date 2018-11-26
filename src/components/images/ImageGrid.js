import React, { Component } from "react";
import { Link } from "react-router-dom";
import './ImageGrid.css';

class ImageGrid extends Component {

    render() {

        const { title, images } = this.props;

        return (
            <div className="col-12 image-grid-container">
                <p className="image-grid-title">{title}</p>
                <div className="row text-center text-lg-left">
                    {images.map(image =>
                        <div key={image.id} className="col-lg-3 col-md-4 col-xs-6">
                        <a href="#" className="d-block mb-4 h-100">
                            <img className="img-fluid img-thumbnail" src={image.thumbnail} alt={image.title} />
                        </a>
                    </div>
                    )};
                </div>
            </div>
        );
    }
}

export default ImageGrid;