import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import events from "./events";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container } from "../../components/styled-components";
import firebase from "firebase";

const localizer = momentLocalizer(moment);

// The Calendar show events posted by different members ,and each member can see only
// the events allowed for his group.

class Tasks extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { event: "", events: events };
  }

  startStr = "start";
  endStr = "end";
  titleStr = "title";
  keyStr = "key";
  authorStr = "author";
  receiver = "receiver";

  handleSelect = ({ start, end, key, author }) => {
    author = "admin";
    const title = window.prompt("New Event name");
    if (title) {
      const receiver = window.prompt("Who can see the event");
      if (receiver) {
        this.setState({
          events: [
            ...this.state.events,
            {
              start,
              end,
              title,
              key,
              author,
              receiver
            }
          ]
        });
        let event = {
          start: String(start),
          end: String(end),
          title: title,
          author: author,
          receiver: receiver
        };
        console.log(event);
        this.updateCalendarEvents(event);
      }
    }
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
      firebase
        .database()
        .ref("calendar/calendar_events")
        .child(pEvent.key)
        .remove();
    }
  }

  readCalendarEvents = () => {
    console.log("Read Calendar Events");
    firebase
      .database()
      .ref("/calendar/calendar_events")
      .once("value")
      .then(snapshot => {
        const events = snapshot.val();

        let myEvents = [];
        if (events !== undefined) {
          Object.keys(events).map(function(key) {
            let event = events[key];
            let startDate;
            let endDate;
            console.log(key);

            if (event.start !== undefined) {
              console.log(event.start);
              console.log(event.end);
              startDate = new Date(event.start);
              endDate = new Date(event.end);
            }

            event.key = key;
            event.start = startDate;
            event.end = endDate;
            myEvents = myEvents.concat(event);
            console.log(myEvents);
          });

          if (myEvents !== undefined) {
            this.setState({ events: myEvents });
            console.log(this.state.events);
          } else {
            console.log("Error Parssing to state");
          }
        }
        console.log(this.state);
      });
  };

  updateCalendarEvents = event => {
    console.log("Update the setup state");
    firebase
      .database()
      .ref("/calendar/calendar_events/")
      .push(event);
  };

  componentDidMount() {
    this.readCalendarEvents();
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
