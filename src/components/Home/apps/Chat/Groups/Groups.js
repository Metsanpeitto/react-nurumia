import React, { Component } from "react";
import "./App.css";

import firebase from "firebase";

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      groups: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      console.log(user);
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
      <div className="app">
        <div className="app__list">
          <Form user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default Chat;
