import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

const stateReadings = {
  promiseIsResolved: "false",
  dataLine: {
    labels: [],
    datasets: [],
    width: "50"
  }
};

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = stateReadings;
  }

  componentDidMount() {
    this.fetchProps();
  }

  cleanData() {
    this.setState({
      dataLine: []
    });
    stateReadings.dataLine = [];
  }

  fetchProps(props) {
    if (this.props) {
      //this.cleanData();
      stateReadings.dataLine = this.props.dataLine;
      this.setState({
        dataLine: stateReadings.dataLine,
        width: this.props.width
      });
    }
  }

  render() {
    return (
      <div key={Math.random()}>
        <MDBContainer className="20">
          <div className="w-100 ">
            <Line
              key="Line"
              data={this.state.dataLine}
              options={{ responsive: true }}
            />
          </div>
        </MDBContainer>
      </div>
    );
  }
}

export default Chart;
