import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import validate from "./LoginFormValidationRules";

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

const { value, errors, handleChange, handleSubmit } = useForm(login, validate);

class ValidField extends React.Component {
  state = {
    id: "",
    label: "",
    value: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  /*
  <input
  className={`input ${errors.password && "is-danger"}`}
  type="password"
  name="password"
  onChange={handleChange}
  value={values.password || ""}
  required
/>*/

  render() {
    const { classes } = this.props;

    return (
      <div>
        {" "}
        <ThemeProvider theme={theme}>
          <TextField
            id={this.props.id}
            label={this.props.label}
            className="textField"
            value={this.props.value}
            onChange={this.handleChange("onchange")}
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
        </ThemeProvider>
      </div>
    );
  }
}

ValidField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ValidField);
