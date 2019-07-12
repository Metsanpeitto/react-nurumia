import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import events from "./events";
import moment from "moment";
import "./react-big-calendar.css";
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
  date;

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

            if (event.start !== undefined) {
              startDate = new Date(event.start);
              endDate = new Date(event.end);
            }

            event.key = key;
            event.start = startDate;
            event.end = endDate;
            myEvents = myEvents.concat(event);
            return null;
          });

          if (myEvents !== undefined) {
            this.setState({ events: myEvents });
          } else {
          }
        }
      });
  };

  updateCalendarEvents = event => {
    firebase
      .database()
      .ref("/calendar/calendar_events/")
      .push(event);
  };

  componentDidMount() {
    this.readCalendarEvents();
    let newDate = new Date();
    this.date = newDate.getDate();
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
            defaultDate={this.date}
            defaultView={Views.MONTH}
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
