import React from "react";
import "react-dropdown/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./style.css";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Setup from "./apps/Setup/Setup";
import AppReadings from "./apps/Readings/AppReadings";
import Alarm from "./apps/Alarms/Alarm";
import Tasks from "./apps/Tasks/Tasks";
import Chat from "./apps/Chat/App/Chat";
import { withAuthorization } from "../Session";
import AuthUserContext from "../Session/context";

function TabContainer(props) {
  return <Typography component={"span"}>{props.children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    value: 0,
    json: [],
    role: "guest"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {}

  render() {
    const { value } = this.state;

    return (
      <div key={Math.random()} className="root">
        <BrowserRouter>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="inherit"
            backgroundcolor="transparent"
            centered
            className="is-light-text text-x-large "
          >
            <Tab label="Readings" />
            <Tab label="Setup" />
            <Tab label="Alarms" />
            <Tab label="Tasks" />
            <Tab label="Chat" />
          </Tabs>

          {value === 0 && (
            <TabContainer>
              <AppReadings />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <div>
                <Setup />
              </div>
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <Alarm />
            </TabContainer>
          )}
          {value === 3 && (
            <TabContainer>
              <Tasks />
            </TabContainer>
          )}
          {value === 4 && (
            <TabContainer>
              <Chat />
            </TabContainer>
          )}
        </BrowserRouter>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
