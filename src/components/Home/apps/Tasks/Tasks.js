import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import events from "./events";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container } from "../../components/styled-components";

const localizer = momentLocalizer(moment);

const propTypes = {};

class Tasks extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { events };
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title
          }
        ]
      });
  };

  onSelectEvent(pEvent) {
    const r = window.confirm("Would you like to remove this event?");
    if (r === true) {
      this.setState((prevState, props) => {
        const events = [...prevState.events];
        const idx = events.indexOf(pEvent);
        events.splice(idx, 1);
        return { events };
      });
    }
  }

  render() {
    //const { localizer } = this.props;

    return (
      <div>
        <Container
          className="is-card-dark is-dark-text-light letter-spacing text-small"
          style={{ height: 523 }}
        >
          <Calendar
            selectable
            style={{ height: 480, marginTop: 10 }}
            events={this.state.events}
            culture={this.state.culture}
            defaultDate={new Date(2019, 6, 26)}
            defaultView={Views.WEEK}
            localizer={localizer}
            onSelectEvent={event => this.onSelectEvent(event)}
            onSelectSlot={this.handleSelect}
          />
        </Container>
      </div>
    );
  }
}

export default Tasks;
