import React, { Component } from "react";
import "./Form.css";
import { Container } from "../../../components/styled-components";
import { Button } from "@material-ui/core";

import Message from "../Message/Message";
import { withFirebase } from "../../../../Firebase/";
import { AuthUserContext } from "../../../../Session";

var authUser = null;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      message: "",
      list: [],
      myName: props.user,
      authUser: null
    };

    this.messageRef = this.messageRef.bind(this);
    this.pushMessage = this.pushMessage.bind(this);
  }

  messageRef = () => {
    this.props.firebase.db
      .ref(`/units/${this.authUser.unitname}/chat/messages/`)
      .once("value")
      .then(snapshot => {
        const message = snapshot.val();
        if (message) {
          return message;
        }
      });
  };

  pushMessage = newItem => {
    if (newItem !== undefined && this.state.authUser.unitname !== undefined) {
      this.props.firebase.db
        .ref(`/units/${this.authUser.unitname}/chat/messages/`)
        .push(newItem);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      console.log(nextProps);
      let shortName = nextProps.user;
      var thisState = {
        ...{ userName: shortName, authUser: nextProps.authUser }
      };
      this.setState({ ...thisState }, () => {});

      this.messageRef();
      this.listenMessages();
    }
  }

  componentDidMount(props) {
    if (props !== undefined) {
      this.componentWillReceiveProps(props);
      this.listenMessages(props);
    }
  }

  handleChange(event) {
    this.setState({ ...{ message: event.target.value } });
  }

  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message
      };
      this.pushMessage(newItem);
      this.setState({ ...{ message: "" } });
    }
  }

  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }

  listenMessages() {
    this.props.firebase.db
      .ref(`/units/${this.authUser.unitname}/chat/messages/`)
      .limitToLast(10)
      .on("value", message => {
        this.setState({
          list: Object.values(message.val())
        });
      });
  }

  render(props) {
    {
      if (props !== undefined) {
        this.componentWillReceiveProps(props);
        this.listenMessages(props);
      }
    }
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser) {
              console.log(authUser);
              this.authUser = authUser;
              console.log(this.authUser);
              console.log(this.state);
            }
          }}
        </AuthUserContext.Consumer>
        <Container className="card chat-grid-card grid-card is-card-dark">
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
              </div>
            </Container>
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
          </Container>
        </Container>
      </div>
    );
  }
}

export default withFirebase(Form);
