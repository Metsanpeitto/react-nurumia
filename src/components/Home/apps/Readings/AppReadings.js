import React, { Component } from "react";
import { Container } from "../../components/styled-components";
import Chart from "./components/Chart";
import ReadingsGrid from "./components/ReadingsGrid";
import MY_STATE from "./components/stateReadings";
import { getData } from "./../getData";
import "bootstrap/dist/css/bootstrap.css";
import Grid from "@material-ui/core/Grid";

class AppReadings extends Component {
  constructor(props) {
    super(props);
    this.state = MY_STATE;
  }

  fetchJson = () => {
    getData(
      "https://cors-anywhere.herokuapp.com/http://melandru.000webhostapp.com/WebAppChart.php"
    )
      .then(data => {
        console.log("fetchJson");
        this.setState({ key: data.id, json: data });
        let len = this.state.json.length;

        if (len > 6) {
          this.cleanData();
          MY_STATE.dataLineTemperature.datasets[0].label = "Air Temperature";
          MY_STATE.dataLineTemperature.datasets[1].label = "Water Temperature";
          MY_STATE.readings.temp = this.state.json[len - 1].temp;
          MY_STATE.readings.wTemp = this.state.json[len - 1].humi;
          MY_STATE.readings.humi = this.state.json[len - 1].humi;
          MY_STATE.readings.wPh = this.state.json[len - 1].wPh;

          for (var i = 0; i < this.state.json.length; ) {
            MY_STATE.dataLineTemperature.datasets[0].data[i] = this.state.json[
              i
            ].temp;

            MY_STATE.dataLineTemperature.datasets[1].data[i] = this.state.json[
              i
            ].wTemp;

            MY_STATE.dataLineTemperature.labels[i] = i;

            i++;
          }
          if (this.state.dataLineTemperature.datasets[0].data.length > 20) {
            this.setState({
              dataLineTemperature: MY_STATE.dataLineTemperature,
              readings: MY_STATE.readings
            });
          }
        }
      })
      .catch(console.log("Catched"));
  };

  cleanData() {
    MY_STATE.dataLineTemperature.datasets[0].data = [];
    MY_STATE.dataLineTemperature.labels = [];
  }

  componentDidMount() {
    this.fetchJson();
    //fetch("http://jsonplaceholder.typicode.com/todos")
  }

  render() {
    return (
      <div className="readings-canvas">
        <Grid
          key="3"
          className="readings-grid"
          container
          spacing={10}
          width={100 % +300}
          marginLeft={10}
          alignContent={"center"}
          style={{ marginLeft: 40, marginTop: 1 }}
        >
          <Grid item xs={8} sm={8} lg={8} xl={8} className="readings-grid-temp">
            <Container className="chart-grid-card is-card-dark is-dark-text-light letter-spacing text-small">
              <h3 className="temperature-header-chart">Temperature Readings</h3>
              <Chart dataLine={this.state.dataLineTemperature} />
            </Container>
          </Grid>

          <Grid item xs={2} sm={2} lg={2} xl={2} className="readings-grid-temp">
            <Container className="card grid-card is-card-dark is-dark-text-light letter-spacing text-small">
              <h3 className="temperature-header-readings">Last Readings</h3>

              <ReadingsGrid />
            </Container>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AppReadings;
