import React, { Component } from "react";
import "./Chat.css";
import "../../../style.css";
import Form from "../Form/Form";
import Panel from "../Panel/Panel";
import firebase from "firebase";

//firebase.initializeApp(firebaseConfig);

import { AuthUserContext } from "../../../../Session";
var authUser = null;

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      authUser: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      //this.setState({ ... });
      this.setState({ user: this.authUser.username, authUser: this.authUser });
    });
  }

  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  handleLogOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="chat-canvas">
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser) {
              this.authUser = authUser;
            }
          }}
        </AuthUserContext.Consumer>
        <div className="app " class="grid-container">
          <div className="app__list grid-item ">
            <Form {...this.state} />
          </div>
          <div className="app__groups grid-item ">
            <Panel />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
