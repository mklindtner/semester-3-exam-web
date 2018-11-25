import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserMapper from "../../data/UserMapper";
import ImageMapper from "../../data/ImageMapper";
import PostMapper from "../../data/PostMapper";
import { Tabs, Tab } from "react-bootstrap";
import Header from "../header/Header";
import getAuthenticationContext from "../../getAuthenticationContext";
import ImageUploadForm from '../images/ImageUploadForm';
import PaginatedImageGrid from "../images/PaginatedImageGrid";
import CreatePost from "../CreatePost/CreatePost";

import RollingPosts from "../timeline/RollingPosts";
import Posts from "../timeline/Posts";

class ProfilePage extends Component {

    constructor(props) {
        super(props);

        this.userMapper = new UserMapper();
        this.imageMapper = new ImageMapper();
        this.postMapper = new PostMapper();
        this.userToRetrieve = props.router.match.params.user ? props.router.match.params.user : getAuthenticationContext().user.id;
        this.state = { user: null, posts: [], images: [], friends: [] };
    }

    componentDidMount() {

        this.userMapper.getUser(this.userToRetrieve).then(response => {
            if (response.status === 200) {
                this.setState({ user: response.body });
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
                this.props.toastr.error("The image was successfully uplaoded.");
                return;
            }

            this.props.toastrFactory().error("Could not upload image.");
        });
    }

    onPostSubmit = (post, callback) => {
        this.postMapper.submitPost(post).then(response => {
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

    render() {

        console.log(this.state.posts);

        return (
            <>
            <Header app={this.props.app} router={this.props.router} onLogout={this.props.onLogout} />
            <main id="profile-page">
                {this.state.user != null && <div id="profile-page" className="row">
                    <div className="row">
                        <div className="col-xl">
                            <img src={this.state.user.profilePicture.src} />
                            <h2>{this.state.user.name}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl">
                            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                                <Tab eventKey={1} title="Posts">
                                    {getAuthenticationContext().user.id === this.userToRetrieve && <CreatePost onSubmit={this.onPostSubmit} />}
                                    <Posts posts={this.state.posts} />
                                    <RollingPosts user={this.userToRetrieve} fetch={this.fetchPosts} />
                                </Tab>
                                <Tab eventKey={2} title="Images">
                                    {getAuthenticationContext().user.id === this.userToRetrieve && <ImageUploadForm onSubmit={this.onImageSubmit} />}
                                    <PaginatedImageGrid pageSize={20} edit={true} fetch={this.fetchImages} />
                                </Tab>
                                <Tab eventKey={3} title="Friends">
                                    <p>Friends</p>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>}
            </main>
            </>
        );
    }
}

export default ProfilePage;