import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import validate from "./validate";

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        color: "white",
        "&$focused": {
          // increase the specificity for the pseudo class
          color: "green"
        }
      }
    }
  }
});
const styles = theme => ({
  container: {},
  textFieldInput: {},

  input: {
    color: theme.palette.common.white
  },

  cssLabel: {},

  cssOutlinedInput: {},

  cssFocused: {},

  notchedOutline: {}
});

class ValidField extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleValueChange.bind(this);

    this.state = {
      id: this.props.id,
      label: this.props.label,
      value: this.props.value,
      comment: ""
    };
  }

  handleValueChange = event => {
    this.setState({
      value: event.target.value
    });
    if (event.target.value !== "" || event.target.value !== undefined) {
      validate(this.state);
    }
  };

  //days-in-veg,days-in-flo-hour-on-veg-hour-on-flo,water-temp-max,water-temp-min,water-ph-max,water-ph-min
  // ,tamp-max,temp-min,humi-max,humi-min

  render() {
    const { classes } = this.props;
    return (
      <div>
        {" "}
        <ThemeProvider theme={theme}>
          <TextField
            id={this.state.id}
            label={this.state.label}
            className="textField"
            value={this.state.value}
            onChange={this.handleValueChange.bind(this)}
            margin="normal"
            variant="outlined"
            style={{ color: "gray" }}
            InputLabelProps={{
              classes: {
                root: theme.white,
                focused: "white"
              }
            }}
            InputProps={{
              className: styles.input,
              style: { color: "gray" },
              classes: {
                className: styles.input,
                root: styles.cssOutlinedInput,
                focused: styles.cssFocused,
                notchedOutline: styles.notchedOutline
              },
              inputMode: "numeric"
            }}
          />
          <h6
            className=".text-x-small"
            style={{ color: "green" }}
            style={{ color: "green" }}
          >
            {this.state.comment}
          </h6>
        </ThemeProvider>
      </div>
    );
  }
}

ValidField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ValidField);