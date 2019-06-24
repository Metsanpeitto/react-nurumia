import React from "react";
import { Container } from "../../../components/styled-components";
import Grid from "@material-ui/core/Grid";
import ValidField from "./TextField1";
import defaultInputs from "./defaultInputs";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import Firebase from "../../../../Firebase/firebase";
import jsonToSendSetup from "./jsonToSendSetup";

// Todo :
//         -End Validation
//         -Let ready Submit ,for The form and for the buttons
//         -Upload the buttons State and the Setup Values Form to firebase
// ah,f,l,p,vi,vo,wh ---> /control/control_state

class SetupGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: defaultInputs,
      isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.parseValues = this.parseValues.bind(this);
  }

  jsonSetup = jsonToSendSetup;

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
      text: this.props.text,
      color: "black"
    }));
    this.parseValues();
    this.updateSetup(this.jsonSetup);
  }

  updateSetup = thisJson => {
    console.log("Update the setup state");
    firebase
      .database()
      .ref("/setup/setup_state")
      .update(this.jsonSetup);
  };

  parseValues() {
    //df,dv,ov,of,wi,wa,pi,pa,ai,aa,hi,ha,ai,aa,hi,ha
    this.jsonSetup.df = this.state.inputs.daysinflo.value;
    this.jsonSetup.dv = this.state.inputs.daysinveg.value;
    this.jsonSetup.ov = this.state.inputs.houronveg.value;
    this.jsonSetup.of = this.state.inputs.houronflo.value;
    this.jsonSetup.wa = this.state.inputs.watertempmax.value;
    this.jsonSetup.wi = this.state.inputs.watertempmin.value;
    this.jsonSetup.pa = this.state.inputs.waterphmax.value;
    this.jsonSetup.pi = this.state.inputs.waterphmin.value;
    this.jsonSetup.aa = this.state.inputs.tempmax.value;
    this.jsonSetup.ai = this.state.inputs.tempmin.value;
    this.jsonSetup.ha = this.state.inputs.humimax.value;
    this.jsonSetup.hi = this.state.inputs.humimin.value;
    console.log(this.jsonSetup);
  }

  render() {
    console.log(this.state.inputs.daysinflo.value);
    return (
      <div key={Math.random()}>
        <Grid
          className="setup-main-grid"
          container
          style={{ paddingTop: 20, paddingLeft: 2, width: 1200, margin: 4 }}
        >
          <Grid
            className="setup-time"
            container
            item
            xs={3}
            sm={3}
            lg={3}
            xl={3}
          >
            <Container className="is-light-text mb-4 padding: 4em;">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Time Parameters
                  </Container>
                </Container>
                <ValidField
                  id="days-in-veg"
                  label="Days In Vegetative"
                  value={this.state.inputs.daysinveg.value}
                />
                <ValidField
                  id="days-in-flo"
                  label="Days In Flowering"
                  value={this.state.inputs.daysinflo.value}
                />
                <ValidField
                  id="hour-on-veg"
                  label="Hour Light On in Vegetative"
                  value={this.state.inputs.houronveg.value}
                />

                <ValidField
                  id="hour-on-flo"
                  label="Hour Light On Flowering"
                  value={this.state.inputs.houronflo.value}
                />
              </Container>
            </Container>
          </Grid>
          <Grid
            className="setup-water"
            container
            item
            xs={3}
            sm={3}
            lg={3}
            xl={3}
          >
            <Container className="is-light-text mb-4 padding: 4em;">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Water Parameters
                  </Container>
                </Container>
                <ValidField
                  id="water-temp-max"
                  label="Water maximun temperature"
                  value={this.state.inputs.watertempmax.value}
                />
                <ValidField
                  id="water-temp-min"
                  label="Water minimun temperature"
                  value={this.state.inputs.watertempmin.value}
                />
                <ValidField
                  id="water-ph-max"
                  label="Water maximun ph"
                  value={this.state.inputs.waterphmax.value}
                />
                <ValidField
                  id="water-ph-min"
                  label="Water minimun ph"
                  value={this.state.inputs.waterphmin.value}
                />
              </Container>
            </Container>
          </Grid>
          <Grid
            className="setup-temp"
            container
            item
            xs={3}
            sm={3}
            lg={3}
            xl={3}
          >
            <Container className="is-light-text mb-4 padding: 4em;">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Air Parameters
                  </Container>
                </Container>
                <ValidField
                  id="temp-max"
                  label="Maximun Air Temperature "
                  value={this.state.inputs.tempmax.value}
                />
                <ValidField
                  id="temp-min"
                  label="Minimun Air Temperature "
                  value={this.state.inputs.tempmin.value}
                />
                <ValidField
                  id="humi-max"
                  label="Maximun Air Humidity"
                  value={this.state.inputs.humimax.value}
                />
                <ValidField
                  id="humi-min"
                  label="Minimun Air Humidity"
                  value={this.state.inputs.humimin.value}
                />
              </Container>
            </Container>
          </Grid>
        </Grid>
        <Button
          onClick={this.handleClick}
          variant="contained"
          style={{
            backgroundColor: "white"
          }}
          className=""
        >
          {this.state.isToggleOn ? "Submit" : "Submitted"}
        </Button>
      </div>
    );
  }
}

export default SetupGrid;
