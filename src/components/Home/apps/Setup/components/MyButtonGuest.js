import React from "react";
import { Button } from "@material-ui/core";

class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "green",
      name: "Name",
      isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateButton = this.updateButton.bind(this);
  }

  updateButton = (thisChild, thisValue) => {};

  handleClick(event) {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
      text: this.props.text,
      color: "black"
    }));

    this.updateButton(this.props.child, this.state.isToggleOn ? "0" : "1");
  }

  render() {
    return (
      <Button
        onClick={this.handleClick}
        variant="contained"
        style={{
          backgroundColor: "white",
          minWidth: "text",
          margin: 2,
          paddingTop: 10,
          color: this.state.isToggleOn ? "green" : "black"
        }}
        className=""
      >
        {this.props.text}
        {this.state.isToggleOn ? "ON" : "OFF"}
      </Button>
    );
  }
}

export default MyButton;
