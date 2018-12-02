import React, { Component } from "react";
import axios from "axios";
import "./CreateGif.css";



class CreateGif extends Component {
  state = {
    api: "http://api.giphy.com/v1/gifs/random",
    mood: "Happy",
    apikey: "BwtD6SkWywtWl6Y9yOdnlXKbkmezp1M9",
    imageData: null,
    fileData: null,
    PictureData: null,
    isPicture: false,
    showpic: false,
    hover: false,
    submitted: false
  };

  componentWillReceiveProps(newProps){
    if(newProps.modalImageData){
      this.setState({imageData: this.props.modalImageData})
    }
  }


  runTimer = e => {
    e.preventDefault();
    axios
      .get(
        `${this.state.api}?api_key=${this.state.apikey}&tag=${this.state.mood}&limit=1`
      )
      .then(response => {
        console.log(response.data.data.images.original.url);
        this.setState({
          imageData: response.data.data.images.original.url,
          showpic: true,
        });
        console.log(this.state.mood);
      });
  };

  deleteHandler = () => {
    this.setState({ showpic: false, imageData: "" });
  };

  toggleHoverOn = () => {
    this.setState({ hover: true });
  };

  toggleHoverOff = () => {
    this.setState({ hover: false });
  };



  handleSelectedFile = (event) =>{
    event.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.setState({
        fileData: event.target.files[0],
        imageData: URL.createObjectURL(event.target.files[0])
    })
    console.log(URL.createObjectURL(event.target.files[0]))
  
  };


  addImageHandler = (event) =>{
    event.preventDefault();
    console.log(this.state.imageData);
    console.log("AIDS");
    if(this.state.fileData !== null){
    const reader = new FileReader();
    reader.readAsDataURL(this.state.fileData);
    reader.onload = () => {
        let data = reader.result.replace(/^data:(.*;base64,)?/, '');
        if ((data.length % 4) > 0) {
            data += '='.repeat(4 - (data.length % 4));
        }
        this.props.onSelectUrl(this.state.imageData);
      }
  }else if(this.state.imageData){
    this.props.onSelectUrl(this.state.imageData);
  }else{
  //lav toastr fejl
  console.log("sut min dodo");
}
  }

  render() {
   
    var imageStyle;
    if (this.state.hover) {
      imageStyle = {
        opacity: 0.7,
        position: "relative",
        cursor: "pointer",
        transition: "0.6s",
        width: "400px",
        height: "400px"
      };
    } else {
      imageStyle = {
        /* kode til hvilken width og height */
        width: "400px",
        height: "400px"
      };
    }

    return (
      <div>
        
        <input type="file" onChange={this.handleSelectedFile} name="file" id="" />
        <div className="Create-Image">Mood of the day!</div>
        <form id="Query-form">
          <select
            value={this.state.mood}
            onChange={event => this.setState({ mood: event.target.value })}
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

        <button className="mood-button" onClick={this.runTimer}>
          Get today's GIF
        </button>
        <p>Mood is: {this.state.mood}</p>
        {this.state.imageData && (
          <div>
              <img
              style={imageStyle}
              src={this.state.imageData}
              alt="mood"
              onClick={this.deleteHandler}
              onMouseEnter={this.toggleHoverOn}
              onMouseLeave={this.toggleHoverOff}
              title="Click to delete picture"
            />
          </div>
        )}
        <button onClick={this.addImageHandler}>Add image to Post</button>
      </div>
      
    );
  }
}

export default CreateGif;
