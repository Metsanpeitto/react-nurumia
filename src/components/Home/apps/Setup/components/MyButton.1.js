import React from "react";
import { Button } from "@material-ui/core";

class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "green",
      name: "Name"
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <Button
        variant="contained"
        style={{
          backgroundColor: "white",
          color: this.props.color
        }}
        className=""
      >
        {this.props.text}
      </Button>
    );
  }
}

export default MyButton;
