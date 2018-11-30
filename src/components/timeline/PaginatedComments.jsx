import React, { Component } from "react";
import Posts from "./Posts";
import "./Posts.css";
import CommentMapper from "../../data/CommentMapper";

class PaginatedCommnets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            total: 0
        };

        this.pageSize = props.pageSize;
        this.commentMapper = new CommentMapper();
        this.currentPage = 1;
    }

    onNextPage = () => {
        page(++this.currentPage);
    }

    onPrevPage = () => {
        if(this.currentPage == 1)
            return;

        page(--this.currentPage);
    }

    page = (pageNumber) => {
        this.fetch(pageSize, pageNumber, (comments, total) => {
            this.setState({comments, total});
        });
    }

    render() {
        return (
            <div>
                <Posts posts={this.state.posts} />
            </div>
        );
    }

    componentDidMount = () => {
        this.loadPosts();
    };

    onScroll = event => {
        if (
            this.isLoading === false &&
            this.hasMore &&
            window.innerHeight + document.documentElement.scrollTop >
            document.getElementById("top-container").clientHeight -
            document.getElementById("top-container").clientHeight / 10
        ) {
            this.loadPosts(this.props.user);
        }
    };

    loadPosts = () => {
        this.isLoading = true;
        this.props.fetch(this.props.user, this.cutoff, posts => {
            this.isLoading = false;
            if (posts.length === 0) {
                this.hasMore = false;
                return;
            }
            this.setState(prevState => ({
                posts: prevState.posts.concat(posts)
            }));

            this.cutoff = posts[posts.length - 1].id;
        });
    };
}

export default PaginatedCommnets;
