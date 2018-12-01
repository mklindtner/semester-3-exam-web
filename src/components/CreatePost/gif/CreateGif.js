import React, {Component} from 'react'
import axios from 'axios'
import './CreateGif.css'

class CreateGif extends Component{


    state= {
        api: 'http://api.giphy.com/v1/gifs/random',
        mood: 'Happy',
        apikey: 'BwtD6SkWywtWl6Y9yOdnlXKbkmezp1M9',
        gifUrl: '',
        showpic: false,
        hover: false
    }
    



    runTimer = (word) =>{
        console.log(word)
        console.log(this.state.mood)
        axios.get(`${this.state.api}?api_key=${this.state.apikey}&tag=${this.state.mood}&limit=1`).then(response =>{
            console.log(response.data.data.images.original.url);
           this.setState({gifUrl: response.data.data.images.original.url, showpic: true})
            console.log(this.state.mood)
        }
        )
    }

    deleteHandler = () =>{
        this.setState({showpic: false, gifUrl: ''})
    }

    toggleHoverOn = () =>{
        this.setState({hover: true})
    }

    toggleHoverOff = () =>{
        this.setState({hover: false})
    }
  


    render(){
        var imageStyle;
           if(this.state.hover){
                imageStyle = {opacity: 0.7, position: 'relative', cursor: 'pointer', transition: '0.6s', width: '400px', height: '400px'}
           }else{
               imageStyle= {
                   /* kode til hvilken width og height */
                   width: '400px',
                   height: '400px'
               }
           }
           


            return( <div>

            <div className="Create-Image">Mood of the day!</div>
            <form id="Query-form">
            <select value={this.state.mood} onChange={(event) => this.setState({mood: event.target.value})}>
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

            <button className="Mood-button" onClick={this.runTimer}>Get today's GIF</button>
            <p>Mood is: {this.state.mood}</p>
            {this.state.showpic &&
            <div>
            <img style={imageStyle} src={this.state.gifUrl} alt="mood" onClick={this.deleteHandler} onMouseEnter={this.toggleHoverOn} onMouseLeave={this.toggleHoverOff} title="Click to delete picture"></img>
            </div>
            }
            </div>
         
        )
    }

}

export default CreateGif;