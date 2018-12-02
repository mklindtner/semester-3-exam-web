import React, { Component } from "react";
import axios from "axios";
import "./CreateGif.css";

class CreateGif extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      currentImage: null,
      showpic: false,
      hover: false,
    }
  }

  getGif = mood => {
    axios.get(`http://api.giphy.com/v1/gifs/random?api_key=BwtD6SkWywtWl6Y9yOdnlXKbkmezp1M9&tag=${mood}&limit=1`)
      .then(response => {
        this.setState({
          currentImage: {
            type: "URL",
            src: response.data.data.images.original.url,
            toSubmit: response.data.data.images.original.url
          }
        })
      })
  }

  deleteHandler = () => {
    this.setState({ showpic: false, currentImage: null });
  };

  toggleHoverOn = () => {
    this.setState({ hover: true });
  };

  toggleHoverOff = () => {
    this.setState({ hover: false });
  };

  onFileSelected = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.setState({
      currentImage: {
        type: "FILE",
        src: URL.createObjectURL(event.target.files[0]),
        toSubmit: event.target.files[0]
      }
    })
  }


  addImageHandler = (event) => {
    this.props.onImageAdded(this.state.currentImage);
    this.setState({ currentImage: null });
  }

  render() {

    var imageStyle;
    if (this.state.hover) {
      imageStyle = {
        opacity: 0.7,
        position: "relative",
        cursor: "pointer",
        transition: "0.6s",
      };
    }

    return (
      <div className="image-selector">
        <input type="file" onChange={this.onFileSelected} name="file" id="" />
        <form id="Query-form">
          <select
            value={this.state.mood}
            onChange={event => this.getGif(event.target.value)}
          >
            <option value="Happy">Happy</option>
            <option value="Lit">Lit</option>
            <option value="Tired">Tired</option>
            <option value="Sad">Sad</option>
            <option value="Putin">Like the king</option>
            <option value="Fail">Like an idiot</option>
            <option value="Playboy">Where the hoes at</option>
            <option value="King">Like Kristoffer Tølbøll</option>
            <option value="Homeless">Like Jonas Grønbek</option>
            <option value="Sheldon">Like Tor browser Tommy</option>
          </select>
        </form>
        {this.state.currentImage && (
          <div>
            <img
              style={imageStyle}
              src={this.state.currentImage.src}
              alt="mood"
              onClick={this.deleteHandler}
              onMouseEnter={this.toggleHoverOn}
              onMouseLeave={this.toggleHoverOff}
              title="Click to delete picture"
            />
          </div>
        )}
        {this.state.currentImage && <button onClick={this.addImageHandler}>Add image to Post</button>}
      </div>
    );
  }
}

export default CreateGif;
