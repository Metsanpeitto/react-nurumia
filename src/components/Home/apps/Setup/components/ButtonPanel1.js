import React from "react";
import { Container } from "../../../components/styled-components";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import MyButton from "./MyButton";

const setup = {
  variant: "",
  color: "green",
  button: ""
};

const styles = theme => ({
  setup: { setup },
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: 90
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
});

const fecthStates = stateApps => {
  console.log("Fetching");
  console.log(stateApps);
  if (stateApps) {
    if (stateApps.setup.json.length > 4) {
      console.log(this.stateApps);
    }
  }
};

function IconLabelButtons(props) {
  fecthStates();
  const { classes } = props;
  return (
    <div key={Math.random()}>
      <Container className="is-light-text mb-20 padding: 6em">
        Actual State of the Actuators
        <Container className="card grid-card is-card-dark">
          <Grid container spacing={10}>
            <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
              <MyButton
                variant="contained"
                color="primary"
                text="Lamp Off"
                className={classes.button}
              />
            </Grid>
            <Grid
              className="button-airheater-grid"
              item
              item
              xs={2}
              sm={2}
              lg={2}
              xl={2}
            >
              <MyButton
                variant="contained"
                color={classes.setup.color}
                text="Air Heater Off"
                className={classes.setup.button}
              />
            </Grid>
            <Grid
              className="button-waterheater-grid"
              item
              item
              xs={2}
              sm={2}
              lg={2}
              xl={2}
            >
              <MyButton
                variant="contained"
                color="secondary"
                text="Water Heater On"
                className={classes.button}
              />
            </Grid>
            <Grid
              className="button-waterpump-grid"
              item
              item
              xs={2}
              sm={2}
              lg={2}
              xl={2}
            >
              <MyButton
                variant="contained"
                color="secondary"
                text="Water Pump On"
                className={classes.button}
              />
            </Grid>
            <Grid
              className="button-valvein-grid"
              item
              item
              xs={2}
              sm={2}
              lg={2}
              xl={2}
            >
              <MyButton
                variant="contained"
                color="primary"
                text="Valve In Off"
                className={classes.button}
              />
            </Grid>
            <Grid
              className="button-valveout-grid"
              item
              item
              xs={2}
              sm={2}
              lg={2}
              xl={2}
            >
              <MyButton
                variant="contained"
                color="primary"
                text="Valve Out Off"
                className={classes.button}
              />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconLabelButtons);
