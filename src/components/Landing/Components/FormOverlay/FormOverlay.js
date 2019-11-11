import React from "react";
import "./formStyle.css";

class FormOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { overlay: false, name: "", email: "" };
    this.openOverlay = this.openOverlay.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);

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
    alert(
      "A form was submitted: " + this.state.name + " // " + this.state.email
    );
    event.preventDefault();
  }

  openOverlay() {
    this.setState({ overlay: true });
  }

  closeOverlay() {
    this.setState({ overlay: false });
  }

  render() {
    return (
      <div>
        {this.state.overlay && (
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="nameInput">Name</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  className="form-control"
                  id="nameInput"
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <label for="emailInput">Company Name</label>
                <input
                  name="company"
                  type="name"
                  value={this.state.company}
                  onChange={this.handleChange}
                  className="form-control"
                  id="companyInput"
                  placeholder="Company Name"
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
                <label for="phoneInput"></label>
                <input
                  name="phone"
                  type="number"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  className="form-control"
                  id="phoneInput"
                  placeholder="Phone Number"
                />
              </div>
              <div className="form-group">
                <label for="messageInput"></label>
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

              <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
            <button
              className="btn btn-default btn-wide palette-sun-flower"
              onClick={this.props.closeOverlay}
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default FormOverlay;
