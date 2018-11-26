import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageMapper from '../../data/ImageMapper';
import ImageGrid from './ImageGrid';
import Spinner from '../ui/Spinner';
import getAuthenticationContext from "../../getAuthenticationContext";
import ImageUploadForm from '../images/ImageUploadForm';

class PaginatedImageGrid extends Component {

    constructor(props) {

        super(props);

        this.state = { images: [], count: -1, currentPage: 1, loading: true };
    }

    componentDidMount = () => {
        this.page(1);
    }


    page(pageNumber) {

        if (pageNumber < 1)
            return;
        if (this.state.count != -1 && pageNumber > Math.ceil(this.state.count / this.props.pageSize))
            return;

        if (!this.state.loading)
            this.setState({ loading: true });

        this.props.fetch(this.props.pageSize, pageNumber, (results, total) => {
            this.setState({ images: results, count: total, currentPage: pageNumber, loading: false });
        });
    }

    render() {
        return (
            <div className="paginated-image-grid">
                <Spinner loading={this.state.loading}>
                    <ImageGrid images={this.state.images} />
                </Spinner>
            </div>
        );
    }

    renderPaginationButtons = () => {

        if (this.state.count <= this.props.pageSize)
            return null;

        let numberOfPages = Math.ceil(this.state.count / this.props.pageSize);
        const buttons = [];
        for (let i = 1; i <= numberOfPages; i++)
            buttons.push(<li key={i} onClick={() => this.page(i)} className={this.state.currentPage === i ? "active" : ""}><a>{i}</a></li>);

        return (
            <ul className="pagination">
                <li onClick={() => this.page(this.state.currentPage - 1)} className={this.state.currentPage === 1 ? "disabled" : ""}>
                    <span aria-hidden="true">&laquo;</span>
                </li>
                {buttons}
                <li onClick={() => this.page(this.state.currentPage + 1)} className={this.state.currentPage === numberOfPages ? "disabled" : ""}>
                    <span aria-hidden="true">&raquo;</span>
                </li>
            </ul>
        );
    }
}

export default PaginatedImageGrid;