import React from "react";
import Comments from "./Comments";
import SmallProfilePicture from '../images/SmallProfilePicture'

class Post extends React.Component {

    render = () => {
        return (
            <div className="post" key={this.props.post.id}>
                <div className="clear-fix">
                    <div className="author-pic">
                        <SmallProfilePicture user={this.props.post.author}/>
                    </div>
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
