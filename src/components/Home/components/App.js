import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import NavBar from "./Navbar";
import Setup from "../apps/Setup/components/SetupGrid";
import AppReadings from "../apps/Readings/AppReadings";
import Alarm from "../apps/Alarms/Alarm";
import "../style.css";

function TabContainer(props) {
  return <Typography component={"span"}>{props.children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "transparent",
    center: true
  }
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0,
    json: []
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div key={Math.random()} className={classes.root}>
        <NavBar />
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="inherit"
          backgroundcolor="transparent"
          className="is-light-text"
        >
          <Tab label="Home" />
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
        {value === 3 && <TabContainer />}
        {value === 4 && <TabContainer>Item Five</TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
