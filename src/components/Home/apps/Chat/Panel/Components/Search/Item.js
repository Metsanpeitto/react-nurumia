import React, { Component } from "react";

import "../../Panel.css";

export default class Item extends Component {
  render() {
    if (
      this.props.userCheck &&
      (this.props.localCheck || this.props.globalCheck)
    ) {
      console.log(this.props);
      return <div className="myItem">{this.props.item}</div>;
    }

    if (
      this.props.groupCheck &&
      (this.props.localCheck || this.props.globalCheck)
    ) {
      {
        console.log(this.props);
        return <div className="myItem">{this.props.item}</div>;
      }
    }
  }
}
