import React, { Component } from "react";
import { Container } from "../../../components/styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { withFirebase } from "../../../../Firebase/";
import { AuthUserContext } from "../../../../Session";
import Create from "./Components/Create/Create";
import Search from "./Components/Search/Search";
import Users from "./Components/Users";

import "./Panel.css";

var authUser = null;

const buttonStyle = {
  color: "white",
  backgroundColor: "rgba(213, 213, 213, 0.21)"
};

class Panel extends Component {
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
          console.log(message);
          return message;
        }
      });
  };

  pushMessage = newItem => {
    if (newItem !== undefined && this.state.authUser.unitname !== undefined) {
      console.log(this.state.authUser.unitname);
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
      this.setState({ ...thisState }, () => {
        console.log(this.state);
      });

      this.messageRef();
      this.listenMessages();
    }
  }

  componentDidMount(props) {
    if (props !== undefined) {
      console.log(props);

      this.componentWillReceiveProps(props);
      this.listenMessages(props);
    }
  }

  handleChange(event) {
    this.setState({ ...{ message: event.target.value } });
  }

  handleSend() {
    if (this.state.message) {
      console.log(this.state);

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

  listenUsersGlobally() {
    this.props.firebase.db
      .ref(`/units/${this.authUser.unitname}/chat/messages/`)
      .limitToLast(10)
      .on("value", message => {
        this.setState({
          list: Object.values(message.val())
        });
        console.log(message);
      });
  }

  listenUsersLocally() {}
  listenChatsGlobally() {}
  listenChatsLocally() {}
  createsChatLocally() {}
  createChatGlobally() {}

  render(props) {
    {
      if (props !== undefined) {
        console.log(props);

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
        <Container className=" panel-grid-card   is-card-dark">
          <Container className="card-heading">
            <Container className="is-dark-text-light letter-spacing text-small">
              <div className="panel-card is-card-dark">
                <div className="panel-buttons">
                  <Button
                    className="panel-create panel-button"
                    variant="contained"
                    enabled
                    style={{
                      color: "white",
                      backgroundColor: "transparent"
                    }}
                  >
                    Create New Chat
                  </Button>

                  <Button
                    className="panel-search panel-button  "
                    variant="contained"
                    enabled
                    style={{
                      color: "is-card-text-light",
                      backgroundColor: "transparent"
                    }}
                  >
                    Search
                  </Button>

                  <Button
                    className="panel-thisUsers"
                    variant="contained"
                    enabled
                    style={{
                      color: "is-card-text-light",
                      backgroundColor: "transparent"
                    }}
                  >
                    This Chat
                  </Button>
                </div>
                <div className="panel-main-card">
                  <Search {...this.state} />
                </div>
              </div>
            </Container>
          </Container>
        </Container>
      </div>
    );
  }
}

export default withFirebase(Panel);
