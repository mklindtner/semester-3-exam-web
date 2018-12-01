import React, { Component } from "react";
import FieldGroup from '../FieldGroup';
import { ControlLabel, FormControl, FormGroup } from "react-bootstrap";

export default class CommentForm extends Component {

    state = {
        content: ""
    }

    onCommentSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.content, success => {
            if (success)
                this.setState({ content: "" });
        });
    }

    handleChange = (e) => {
        this.setState({ content: e.currentTarget.value });
    }

    render() {
        return (
            <div className="comment-form">
                <form onSubmit={this.onCommentSubmit}>
                    <FormGroup bsSize="large">
                        <FormGroup controlId="formControlsTextarea">
                            <FormControl style={{fontSize: '14px'}} componentClass="textarea" placeholder="Write a comment!" name="content" value={this.state.content} onChange={this.handleChange} />
                        </FormGroup>
                        <input type="submit" value="Submit" />
                    </FormGroup>
                </form>
            </div>
        );
    }
}