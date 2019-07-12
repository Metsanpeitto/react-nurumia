import React, { Component } from "react";
import "./Form.css";
import { Container } from "../../../components/styled-components";
import { Button } from "@material-ui/core";

import Message from "../Message/Message";
import firebase from "firebase";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "Sebastian",
      message: "",
      list: [],
      myName: props.user
    };
    this.messageRef = firebase
      .database()
      .ref("/Chat")
      .child("messages");
    this.listenMessages();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      let shortName = nextProps.user.email.split("@")[0];
      this.setState({ userName: shortName });
    }
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message
      };

      this.messageRef.push(newItem);
      this.setState({ message: "" });
    }
  }
  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }

  listenMessages() {
    this.messageRef.limitToLast(10).on("value", message => {
      this.setState({
        list: Object.values(message.val())
      });
    });
  }

  render() {
    return (
      <Container className="card grid-card is-card-dark">
        <Container className="card-heading">
          <Container className="is-dark-text-light letter-spacing text-small">
            <div className="form">
              <div className="form__message">
                {this.state.list.map((item, index) => (
                  <Message
                    key={index}
                    message={item}
                    userName={this.state.userName}
                  />
                ))}
              </div>
              <div className="form__row">
                <input
                  className="form__input"
                  type="text"
                  placeholder="Type message"
                  value={this.state.message}
                  onChange={this.handleChange.bind(this)}
                  onKeyPress={this.handleKeyPress.bind(this)}
                />
                <Button
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderColor: "grey"
                  }}
                  className="form__button"
                  onClick={this.handleSend.bind(this)}
                >
                  send
                </Button>
              </div>
            </div>
          </Container>
        </Container>
      </Container>
    );
  }
}
