import React, { Component } from "react";
import "./Message.css";

export default class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message_author">{this.props.message.userName}:</span>
        {this.props.message.message}
      </div>
    );
  }
}
