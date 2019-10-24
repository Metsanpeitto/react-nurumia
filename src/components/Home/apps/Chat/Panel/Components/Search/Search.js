import React, { Component } from "react";
import { withFirebase } from "./../../../../../../Firebase";
import { AuthUserContext } from "./../../../../../../Session";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Container } from "../../../../../components/styled-components";

import Item from "./Item";
import "../../Panel.css";

var authUser = null;

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      message: "",
      myName: props.user,
      authUser: null,
      localCheck: false,
      globalCheck: true,
      userCheck: false,
      groupCheck: true,
      list: [],
      itemArea: "",
      itemType: "",
      itemUser: "",
      itemGroup: "",
      value: "",
      value1: "",
      setValue: "",
      setValue1: ""
    };

    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.doSearch = this.doSearch.bind(this);
    // this.messageRef = this.messageRef.bind(this);
    //  this.pushChat = this.pushChat.bind(this);
  }

  handleChangeArea = event => {
    if (event) {
      var value = event.target.value;
      this.setState({ ...(value = { value }) });
      if (value === "local") {
        console.log(value);

        this.setState(
          { ...{ local: true, global: false, itemArea: "local" } },
          () => {
            console.log(value);
          }
        );
      } else {
        this.setState(
          { ...{ local: false, global: true, itemArea: "global" } },
          () => {
            console.log(value);
          },
          console.log(this.state)
        );
      }

      console.log(value);
      console.log(this.state);
    }
  };

  handleChangeType = event => {
    if (event) {
      var value1 = event.target.value;
      this.setState({ ...(value1 = { value1 }) });
      if (value1 === "user") {
        this.setState(
          { ...{ user: true, group: false, itemType: "user" } },
          () => {
            console.log(value1);
            console.log(this.state);
          }
        );
      } else {
        this.setState(
          { ...{ user: false, group: true, itemType: "group" } },
          () => {
            console.log(value1);
            console.log(this.state);
          }
        );
      }
    }
  };

  groupRefLocal = () => {
    this.props.firebase.db
      .ref(`/units/unit1/chat/groups/`)
      .once("value")
      .then(snapshot => {
        const array = snapshot.val();
        console.log(array);

        if (array) {
          console.log(array);
          this.setState({ list: array });
          console.log(this.state);
        }
      });
  };

  userRefLocal = () => {
    this.props.firebase.db
      .ref(`/units/unit1/chat/users/`)
      .once("value")
      .then(snapshot => {
        const users = snapshot.val();
        console.log(users);

        if (users) {
          console.log(users);
          this.setState({ list: users });
          console.log(this.state);
        }
      });
  };

  groupRefGlobal = () => {
    this.props.firebase.db
      .ref(`/chat/groups/`)
      .once("value")
      .then(snapshot => {
        const groups = snapshot.val();
        console.log(groups);

        if (groups) {
          console.log(groups);
          this.setState(...{ list: groups });
          console.log(this.state);
        }
      });
  };

  userRefGlobal = () => {
    this.props.firebase.db
      .ref(`/chat/users/`)
      .once("value")
      .then(snapshot => {
        const users = snapshot.val();
        console.log(users);

        if (users) {
          console.log(users);
          this.setState(...{ list: users });
          console.log(this.state);
        }
      });
  };

  doSearch = () => {
    console.log(this.state.value);
    console.log(this.state.value1);

    if (this.state.value === "global" && this.state.value1 === "user") {
      this.userRefGlobal();
      console.log("global user");
    }
    if (this.state.value === "global" && this.state.value1 === "group") {
      this.groupRefGlobal();
      console.log("global group");
    }
    if (this.state.value === "local" && this.state.value1 === "user") {
      this.userRefLocal();
      console.log("local user");
    }
    if (this.state.value === "local" && this.state.value1 === "group") {
      this.groupRefLocal();
      console.log("local group");
    }
  };

  componentDidMount(props) {
    if (this.authUser) {
      this.doSearch();
    }
  }

  render(props) {
    if (this.authUser) {
      this.doSearch();
    }

    {
      if (props !== undefined) {
        console.log(props);
        this.componentWillReceiveProps(props);
        // this.listenMessages(props);
      }
    }

    if (this.state.list === []) {
      this.doSearch();
    }
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser) {
              this.authUser = authUser;
            }
          }}
        </AuthUserContext.Consumer>{" "}
        <div className="panel-create">Search for ...</div>
        <div
          className="options card"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <FormControl component="fieldarea">
            {" "}
            <FormLabel
              component="legend"
              style={{ marginBottom: "0%" }}
            ></FormLabel>
            <RadioGroup
              aria-label="area"
              name="area"
              value={this.state.value}
              onChange={this.handleChangeArea}
              style={{ display: "block", marginBottom: "0%" }}
            >
              <FormControlLabel
                value="local"
                control={<Radio color="primary" />}
                label="Local"
                style={{
                  marginLeft: "0%",
                  marginRight: "2%",
                  marginBottom: "0%",
                  verticalAlign: "middle",
                  width: "fit-content"
                }}
              />
              <FormControlLabel
                value="global"
                control={<Radio color="primary" />}
                label="Global"
                style={{
                  marginLeft: "0%",
                  marginRight: "2%",
                  marginBottom: "0%",
                  verticalAlign: "middle",
                  width: "fit-content"
                }}
              />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldtype">
            <RadioGroup
              aria-label="type"
              name="type"
              value={this.state.value1}
              onChange={this.handleChangeType}
              style={{ display: "block", marginBottom: "0%" }}
            >
              <FormControlLabel
                value="user"
                control={<Radio color="primary" />}
                label="User"
                style={{
                  marginLeft: "0%",
                  marginRight: "2%",
                  marginBottom: "0%",
                  verticalAlign: "middle",
                  width: "fit-content"
                }}
              />
              <FormControlLabel
                value="group"
                control={<Radio color="primary" />}
                label="Group"
                style={{
                  marginLeft: "0%",
                  marginRight: "2%",
                  marginBottom: "0%",
                  verticalAlign: "middle",
                  width: "fit-content"
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <Container className="is-dark-text-light letter-spacing text-small">
          <div className="form">
            <div className="form_item">
              {this.state.list.map((item, index) => (
                <Item key={index} item={item} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default withFirebase(Search);
