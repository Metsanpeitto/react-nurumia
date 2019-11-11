import React from "react";
import "./formStyle.css";

class OverlayContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: ""
    };

    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    console.log("Change detected. State updated" + name + " = " + value);
  }

  handleSubmit(event) {
    const name = this.state.name;
    const email = this.state.email;
    const phone = this.state.phone;
    const message = this.state.message;
    if (name && email && phone && message) {
      alert(
        "A form was submitted: " + this.state.name + " // " + this.state.email
      );
    } else {
      alert("Some parameter is not correct");
    }

    event.preventDefault();
  }
  render() {
    return (
      <div className="container white">
        <div className="container-canvas">
          <form onSubmit={this.handleSubmit} className="form-canvas">
            <div className="form-group">
              <label for="nameImput">Name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                className="form-control"
                id="nameImput"
                placeholder="Name"
              />
            </div>
            <div className="form-group">
              <label for="emailInput">Email</label>
              <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="form-control"
                id="emailInput"
                placeholder="email@domain.com"
              />
            </div>
            <div className="form-group">
              <label for="phoneInput">Phone Number</label>
              <input
                name="phone"
                type="text"
                value={this.state.phone}
                onChange={this.handleChange}
                className="form-control"
                id="phoneInput"
                placeholder="Phone Number"
              />
            </div>
            <div className="form-group">
              <label for="messageInput">Message</label>
              <input
                name="message"
                type="text"
                value={this.state.message}
                onChange={this.handleChange}
                className="form-control"
                id="messageInput"
                placeholder="Your message "
              />
            </div>

            <button type="submit" value="Submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>

        <p></p>
        <button
          className="btn btn-default btn-wide palette-sun-flower"
          onClick={this.props.closeOverlay}
        >
          Close
        </button>
      </div>
    );
  }
}

export default OverlayContent;
