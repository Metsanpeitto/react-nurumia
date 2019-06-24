import React, { Component } from "react";
import { Container } from "../../components/styled-components";
import Chart from "./components/Chart";
import ReadingsGrid from "./components/ReadingsGrid";
import MY_STATE from "./components/stateReadings";
import { getData } from "./../getData";
import "bootstrap/dist/css/bootstrap.css";

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
      <div>
        <Container className="chart">
          <Container className="card grid-card is-card-dark">
            <Container className="card-heading">
              <Container className="is-dark-text-light letter-spacing text-small">
                <h3 className="temperature-header-chart">
                  Temperature Readings
                </h3>
              </Container>
            </Container>
            <Chart dataLine={this.state.dataLineTemperature} />
          </Container>
        </Container>
        <Container className="container-chart is-light-text mb-12 padding: 1em;">
          <Container className="card grid-card is-card-dark">
            <Container className="card-heading">
              <Container className="is-dark-text-light letter-spacing text-small">
                <h3 className="temperature-header-chart">Last Readings</h3>
              </Container>
            </Container>
            <ReadingsGrid />
          </Container>
        </Container>
      </div>
    );
  }
}

export default AppReadings;
