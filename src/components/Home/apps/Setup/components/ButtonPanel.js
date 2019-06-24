import React from "react";
import { Container } from "../../../components/styled-components";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MyButton from "./MyButton";
import stateSetup from "./stateSetup";
import { getData } from "./../../getData";
import firebase from "firebase";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: 20
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 200
  }
});

class ButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = stateSetup;
    this.readSetupButtons = this.readSetupButtons.bind(this);
  }

  fetchJson = () => {
    getData(
      "https://cors-anywhere.herokuapp.com/http://melandru.000webhostapp.com/NurumiWebApi.php"
    )
      .then(data => {
        console.log("fetchJson");
        let json = data[0];
        console.log(data[0]);
        console.log(json);

        if (data[0]) {
          stateSetup.json = data;
          this.setState({ stateSetup });
          console.log(this.state);
          this.setButtonState();
        }
      })
      .catch(console.log("Catched"));
  };

  setButtonState = () => {
    console.log("Set Button State");
    if (this.state.json[0]) {
      this.setState({
        pump: this.state.json[0].pump,
        fan: this.state.json[0].fan,
        valveIn: this.state.json[0].valveIn,
        valveOut: this.state.json[0].valveOut,
        wHeater: this.state.json[0].wHeater,
        aHeater: this.state.json[0].aHeater,
        lamp: this.state.json[0].lamp
      });
    }

    this.state.aHeater === "0"
      ? this.setState({
          color1: stateSetup.black,
          text1: stateSetup.textaHeater + " "
        })
      : this.setState({
          color1: stateSetup.green,
          text1: stateSetup.textaHeater + " "
        });

    this.state.wHeater === "0"
      ? this.setState({
          color2: stateSetup.black,
          text2: stateSetup.textwHeater + " "
        })
      : this.setState({
          color2: stateSetup.green,
          text2: stateSetup.textwHeater + " "
        });

    this.state.pump === "0"
      ? this.setState({
          color3: stateSetup.black,
          text3: stateSetup.textPump + " "
        })
      : this.setState({
          color3: stateSetup.green,
          text3: stateSetup.textPump + " "
        });

    this.state.valveIn === "0"
      ? this.setState({
          color4: stateSetup.black,
          text4: stateSetup.textValveIn + " "
        })
      : this.setState({
          color4: stateSetup.green,
          text4: stateSetup.textValveIn + " "
        });

    this.state.valveOut === "0"
      ? this.setState({
          color5: stateSetup.black,
          text5: stateSetup.textValveOut + " "
        })
      : this.setState({
          color5: stateSetup.green,
          text5: stateSetup.textValveOut + " "
        });

    this.state.lamp === "0"
      ? this.setState({
          color6: stateSetup.black,
          text6: stateSetup.textLamp + " "
        })
      : this.setState({
          color6: stateSetup.green,
          text6: stateSetup.textLamp + " "
        });

    this.state.fan === "0"
      ? this.setState({
          color7: stateSetup.black,
          text7: stateSetup.textFan + " "
        })
      : this.setState({
          color7: stateSetup.green,
          text7: stateSetup.textFan + " "
        });
  };

  cleanData() {
    stateSetup = [];
  }

  componentDidMount() {
    this.fetchJson();
    this.readSetupButtons();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  readSetupButtons = () => {
    console.log("Read Setup Buttons");
    firebase
      .database()
      .ref("/control/control_state")
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();
        if (data !== undefined) {
          this.setState({
            pump: data.p,
            fan: data.f,
            valveIn: data.vi,
            valveOut: data.vo,
            wHeater: data.wh,
            aHeater: data.ah,
            lamp: data.l
          });
          console.log(this.state.pump);
        }
      });
  };

  render() {
    return (
      <Container
        className="setup-button-card is-card-dark  "
        style={{ padding: 5 }}
      >
        <h3
          className="is-dark-text-light text-small"
          style={{ paddingLeft: 5 }}
        >
          Actual State of the Actuators
        </h3>
        <Container className=" grid-card is-card-dark ">
          <MyButton
            color={this.state.color4}
            text={this.state.text4}
            className="button-valvein"
            child="vi"
          />

          <MyButton
            backgroundColor={this.state.backgroundColor2}
            color={this.state.color2}
            text={this.state.text2}
            className="button-waterheater"
            child="wh"
          />

          <MyButton
            color={this.state.color3}
            text={this.state.text3}
            className="button-waterpump"
            child="p"
          />

          <MyButton
            color={this.state.color5}
            text={this.state.text5}
            className="button-valveout"
            child="vo"
          />

          <MyButton
            color={this.state.color6}
            text={this.state.text6}
            className="button-lamp"
            child="l"
          />

          <MyButton
            color={this.state.color7}
            text={this.state.text7}
            className="button-fan"
            child="f"
          />
        </Container>
      </Container>
    );
  }
}

export default withStyles(styles)(ButtonPanel);
