import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageMapper from '../../data/ImageMapper';
import ImageGrid from './ImageGrid';

class PaginatedImageGrid extends Component {

    constructor(props) {

        super(props);

        this.state = { images: [] };
        this.currentPage = 1;
        this.imageMapper = new ImageMapper();
    }

    componentDidMount = () => {
        this.page(1);
    }

    page(pageNumber) {
        if (pageNumber < 1)
            return;

        this.imageMapper.getByUserPaginated(this.props.user, this.props.pageSize, pageNumber)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ images: response.body });
                }
            })
    }

    previousPage = () => {

        if (this.currentPage == 1)
            return;

        this.page(this.currentPage - 1);
        this.currentPage -= 1;
    }

    nextPage = () => {
        this.page(this.currentPage + 1);
        this.currentPage += 1;
    }

    render() {

        return (
            <div className="paginated-image-grid">
                <ImageGrid images={this.state.images}/>
                
            </div>
        );
    }
}

export default PaginatedImageGrid;