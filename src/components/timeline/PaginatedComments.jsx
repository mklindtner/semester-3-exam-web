import React, { Component } from "react";
import Posts from "./Posts";
import "./Posts.css";
import CommentMapper from "../../data/CommentMapper";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import "./PaginatedComments.css"

class PaginatedComments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            total: 0,
            closed: true,
            content: "",
        };

        this.pageSize = props.pageSize;
        this.currentPage = 1;
        this.fetched = false;
    }

    onNextPage = () => {
        this.page(++this.currentPage);
    }

    onPrevPage = () => {
        if (this.currentPage == 1)
            return;

        this.page(--this.currentPage);
    }

    page = (pageNumber, done) => {

        if (pageNumber < 1 || pageNumber > this.getLastPage())
            return;

        this.currentPage = pageNumber
        this.props.fetch(this.props.parent, this.props.pageSize, pageNumber, (comments, total) => {
            this.setState({ comments, total }, () => {
                if (done != null)
                    done();
            });
        });
    }

    handleChange = (e) => {
        this.setState({ content: e.currentTarget.value });
    }

    onCommentSubmit = (content, resultCallback) => {
        this.props.onCommentSubmit(content, (comment) => {
            // Intercept created comment, and display if successful

            if (comment) {
                this.page(this.getLastPage(), () => {
                    this.setState({ comments: this.state.comments.concat(comment) });
                })
            }
            resultCallback(comment);
        });
    }

    toggleVisibility = () => {

        if (this.state.closed && !this.fetched) {
            this.page(1);
            this.fetched = true;
        }

        this.setState({ closed: !this.state.closed })
    }

    render() {

        const { closed } = this.state;

        return (
            <div className="paginated-comments">
                <a style={{ marginBottom: '10px', display: 'block' }} onClick={this.toggleVisibility}>{closed ? "Show comments." : "Hide comments"}</a>
                {closed ? null : <Comments comments={this.state.comments} />}
                {closed ? null : this.createPaginationButtons()}
                {closed ? null : <CommentForm onSubmit={this.onCommentSubmit} />}
            </div>
        );
    }

    getLastPage = () => {
        return Math.max(Math.ceil(this.state.total / this.props.pageSize), 1);
    }

    createPaginationButtons = () => {

        const lastPage = this.getLastPage();

        const buttons = [];
        for (let i = 1; i <= lastPage; i++)
            buttons.push(<li key={i} onClick={() => this.page(i)} className={i === this.currentPage ? "page-item active" : "page-item"}><a class="page-link">{i}</a></li>)

        return (
            <ul class="pagination">
                <li onClick={() => this.page(this.currentPage - 1)} className={this.currentPage < 2 ? "page-item disabled" : "page-item"}><a class="page-link">{'<'}</a></li>
                {buttons}
                <li onClick={() => this.page(this.currentPage + 1)} className={this.currentPage >= lastPage ? "page-item disabled" : "page-item"}><a class="page-link">></a></li>
            </ul>
        )
    }
}

export default PaginatedComments;
