import React from "react";
import Comments from "./Comments";

class Post extends React.Component {

    render = () => {
        return (
            <div className="post" key={this.props.post.id}>
                <div className="clear-fix">
                    <p className="author">{this.props.post.author.name}</p>
                    <p className="created">{this.props.post.timeCreated}</p>
                </div>
                <p className="contents">{this.props.post.contents}</p>
                {this.props.comments != null && this.props.comments(this.props.post.id)}
            </div >
        );
    };
}

export default Post;
