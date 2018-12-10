{/*import EmojiReact from 'react-emoji-react';
import React, { Component } from 'react';
import { render } from 'react-dom';

class ReactingComponent extends Component {
  constructor() {
    super();
    this.state = {
      emojis
    };
  }

  onReaction(name) {
    const emojis = this.state.emojis.map(emoji => {
      if (emoji.name === name) {
        emoji.count += 1;
      }
      return emoji;
    });
    this.setState({ emojis });
  }

  onEmojiClick(name) {
    console.log(name);
    const emojis = this.state.emojis.concat([{name, count: 1}]);
    this.setState({ emojis });
  }

  render() {
    return (
      <EmojiReact 
        reactions={this.state.emojis} 
        onReaction={(name) => this.onReaction(name)} 
        onEmojiClick={(name) => this.onEmojiClick(name)}
      />
    );
  }
} */}

