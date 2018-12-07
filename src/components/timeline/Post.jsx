import React from "react";
import Comments from "./Comments";
import SmallProfilePicture from '../images/SmallProfilePicture'
import * as ReactBootstrap from 'react-bootstrap';
import PostMapper from '../../data/PostMapper'

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: this.getFirstImage(),
      loading: false

    };
    this.postMapper = new PostMapper()
  }

  getFirstImage = () => {
    if (this.props.post.images == undefined) return null;

    if (this.props.post.images.length < 1) return null;

    return this.props.post.images[0];
  };


  deletePostHandler = (id) => {

    this.setState({ loading: true })
    this.postMapper.deletePost(id).then(res => {
      this.setState({ loading: false })
    })
    let indexToDelete = this.props.posts.findIndex((post) => {
      return post.id === id;
    });
    this.props.clicked(indexToDelete);
  }


  render = () => {

    return (
      <div className="post" key={this.props.post.id}>
        <div className="dropdown-div">
        </div>
        <div className="post-header">
          <div className="author-pic">
            <SmallProfilePicture user={this.props.post.author} />
          </div>
          <p className="author">{this.props.post.author.name}</p>
          <p className="created">{this.props.post.timeCreated}</p>
        </div>
        <p className="contents">{this.props.post.contents}</p>
        {this.displayImages()}
        {this.props.comments != null && this.props.comments(this.props.post.id)}
        <ReactBootstrap.DropdownButton
          bsStyle={'info'}
          title={'Action'}
          key={this.props.id}
        >
          <ReactBootstrap.MenuItem onClick={() => this.deletePostHandler(this.props.post.id)}>{this.state.loading ? 'Deleting...' : 'Delete'}</ReactBootstrap.MenuItem>
        </ReactBootstrap.DropdownButton>
      </div >
    );
  };

  displayImages = () => {
    const { images } = this.props.post;

    if (images != undefined && images.length < 1) return null;

    return this.renderGallery(images);
  };

  focus = image => {
    this.setState({ focus: image });
  };

  renderGallery = images => {
    return (
      <div className="post-gallery">
        <div className="post-gallery-full">
          <img src={this.state.focus.full} />
        </div>
        {images.length > 1 && (
          <div className="post-gallery-thumbnails">
            {images.map(image => (
              <div
                key={image.id}
                className="post-gallery-thumbnail-container"
                onClick={() => this.focus(image)}
              >
                <img src={image.thumbnail} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
}

export default Post;
