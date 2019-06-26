import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import events from "./events";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class Tasks extends React.Component {
  state = { culture: "fr" };

  render() {
    return (
      <div>
        <Calendar
          style={{ height: 700 }}
          events={events}
          culture={this.state.culture}
          defaultDate={new Date(2019, 6, 26)}
          localizer={localizer}
        />
      </div>
    );
  }
}

export default Tasks;
