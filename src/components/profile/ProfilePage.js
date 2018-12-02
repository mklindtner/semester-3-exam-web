import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserMapper from "../../data/UserMapper";
import ImageMapper from "../../data/ImageMapper";
import CommentMapper from "../../data/CommentMapper";
import PostMapper from "../../data/PostMapper";
import { Tabs, Tab } from "react-bootstrap";
import Header from "../header/Header";
import getAuthenticationContext from "../../getAuthenticationContext";
import ImageUploadForm from '../images/ImageUploadForm';
import PaginatedImageGrid from "../images/PaginatedImageGrid";
import CreatePost from "../CreatePost/CreatePost";

import RollingPosts from "../timeline/RollingPosts";
import Posts from "../timeline/Posts";
import FriendGrid from "../FriendGrid";
import PaginatedComments from "../timeline/PaginatedComments";
import LargeProfilePicture from '../images/LargeProfilePicture';
import FriendStatus from "./FriendStatus";

import './ProfilePage.css';

class ProfilePage extends Component {

    constructor(props) {
        super(props);

        this.userMapper = new UserMapper();
        this.imageMapper = new ImageMapper();
        this.postMapper = new PostMapper();
        this.commentMapper = new CommentMapper();
        this.userToRetrieve = this.getUserToRetrive();
        this.state = { user: null, posts: [], images: [], friends: [] };
    }

    getUserToRetrive = () => {

        const {user, tab} = this.props.router.match.params;

        if(user === undefined && tab === undefined)
            return getAuthenticationContext().user.id;

        if(user != undefined && tab != undefined)
            return user;

        return user.match("[0-9]+") ? user : getAuthenticationContext().user.id;
    }

    getActiveTab = () => {
        
                const {user, tab} = this.props.router.match.params;
        
                if(user === undefined && tab === undefined)
                    return "posts";
        
                if(user !== undefined && tab !== undefined)
                    return tab;
        
                return user.match("[0-9]+") ? "posts" : user;
            }

    componentDidMount() {

        const friends = this.userMapper.getFriends(this.userToRetrieve);
        const userDetails = this.userMapper.getUser(this.userToRetrieve);

        Promise.all([friends, userDetails]).then(results => {

            if (results[0].status === 200) {
                this.setState({ user: results[1].body, friends: results[0].body });
                return;
            }

            this.props.toastrFactory().error("Could not retrieve user information.");
        });
    }

    fetchImages = (pageSize, pageNumber, callback) => {
        this.imageMapper.getByUserPaginated(this.userToRetrieve, pageSize, pageNumber).then(response => {
            if (response.status === 200) {
                callback(response.body.results, response.body.count);
                return;
            }

            this.props.toastrFactory().error("Could not load images.");
        });
    }

    onImageSubmit = (image) => {
        this.imageMapper.create(image).then(response => {
            if (response.status === 201) {
                this.props.toastrFactory().success("The image was successfully uplaoded.");
                return;
            }

            this.props.toastrFactory().error("Could not upload image.");
        });
    }

    onPostSubmit = (post, callback) => {
        this.postMapper.submitTextPost(post).then(response => {
            if (response.status === 201) {
                this.props.toastrFactory().success("The post was created.");
                this.setState(prevState => {
                    prevState.posts.unshift(response.body);
                    return { posts: prevState.posts };
                }, () => callback(response.body));
                return;
            }

            this.props.toastrFactory().error("Could not create post.");
        });
    };

    fetchPosts = (user, cutoff, callback) => {
        this.postMapper.getRollingPosts(user, 25, cutoff).then(response => {
            if (response.status === 200) {
                callback(response.body);
                return;
            }

            this.props.toastrFactory().error("Could not fetch profile posts.");
            callback([]);
        })
    }
    
    onTabChange = (activeKey) => {
        this.props.router.history.push(activeKey);
    } 

    render() {

        const activeTab = this.getActiveTab();

        return (
            <>
            <Header app={this.props.app} router={this.props.router} onLogout={this.props.onLogout} />
            <main id="profile-page" className="container">
                {this.state.user !== null && <div className="row">
                    <div className="col-sm-3">
                        <div>
                            <LargeProfilePicture width="100%" height="auto" user={this.state.user} />
                            <h2 className="profile-name">{this.state.user.name}</h2>
                            {getAuthenticationContext().user.id !== this.userToRetrieve && <FriendStatus other={this.userToRetrieve} toastrFactory={this.props.toastrFactory}/>}
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div id="profile-page">
                            <div className="row">
                                <Tabs onSelect={this.onTabChange} defaultActiveKey={activeTab} id="uncontrolled-tab-example">
                                    <Tab eventKey="posts" title="Posts">
                                        {getAuthenticationContext().user.id === this.userToRetrieve && <CreatePost onSubmit={this.onPostSubmit} />}
                                        <Posts posts={this.state.posts} />
                                        <RollingPosts user={this.userToRetrieve} fetch={this.fetchPosts} comments={this.createCommentSection} />
                                    </Tab>
                                    <Tab eventKey="images" title="Images">
                                        {getAuthenticationContext().user.id === this.userToRetrieve && <ImageUploadForm onSubmit={this.onImageSubmit} />}
                                        <PaginatedImageGrid pageSize={20} edit={true} fetch={this.fetchImages} />
                                    </Tab>
                                    <Tab eventKey="friends" title="Friends">
                                        <FriendGrid friends={this.state.friends} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>}
            </main>
            </>
        );
    }

    onCommentSubmit = (postId, contents, resultCallback) => {
        this.commentMapper.createPostComment(postId, contents).then(response => {
            if (response.status === 201) {
                this.props.toastrFactory().success("The comment was posted.");
                resultCallback(response.body);
                return;
            }

            this.props.toastrFactory().success("The comment was not posted.");
            resultCallback(false);
        })
    }

    createCommentSection = (postId) => {
        return <PaginatedComments
            parent={postId}
            onCommentSubmit={(content, resultCallback) => this.onCommentSubmit(postId, content, resultCallback)}
            pageSize={10}
            fetch={this.fetchComments} />
    }

    fetchComments = (postId, pageSize, pageNumber, callback) => {

        const comments = this.commentMapper.getPostComments(postId, pageSize, pageNumber);
        const count = this.commentMapper.getPostCommentsCount(postId);

        Promise.all([comments, count]).then(results => {

            if (results[0].status === 200 && results[0].status === 200) {
                callback(results[0].body, results[1]);
                return;
            }

            this.props.toastrFactory().error("Could not fetch comments.");
            callback([], 0);
        });
    }
}

export default ProfilePage;