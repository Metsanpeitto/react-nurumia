import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Container } from "../../components/styled-components";
import "../../style.css";
import firebase from "firebase";

const Table = ({ alarms }) => {
  return (
    <Container className="card alarm-card  is-card-dark">
      <Container className="is-dark-text-light letter-spacing text-small">
        <h1 className="text-large" style={{ textAlign: "center" }}>
          {" "}
          Record of the Last Alarms
        </h1>
        <MDBTable>
          <MDBTableHead color="primary-color" textWhite>
            <tr>
              <th>TimeStamp</th>
              <th>Air Too Hot</th>
              <th>Air Too Cold</th>
              <th>Air Too Dry</th>
              <th>Air Too Moist</th>
              <th>Water Too Cold</th>
              <th>Water Too Hot</th>
              <th>Ph Too Low</th>
              <th>Ph too High</th>
              <th>Water Level Too Low</th>
              <th>Water Level Too High</th>
              <th>Lights On </th>
              <th>Lights Off</th>
              <th>Motion Start </th>
              <th>Motion Stop</th>
            </tr>
          </MDBTableHead>

          <MDBTableBody color="primary-color" textWhite>
            {alarms !== undefined ? (
              Object.keys(alarms).map(function(key) {
                let alarm = alarms[key];
                alarm.data = key;
                const alarmString = "Alarm";
                const okString = "OK";
                let ac, ad, ah, am, lf, lh, ll, ln, ma, mo, wh;
                let acColor,
                  adColor,
                  ahColor,
                  amColor,
                  lfColor,
                  lhColor,
                  llColor,
                  lnColor,
                  maColor,
                  moColor,
                  whColor;
                const readable = new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
                }).format(alarm.timestamp);

                if (alarm.alarm.ac === 1) {
                  ac = alarmString;
                  acColor = "red";
                } else {
                  ac = okString;
                  acColor = "green";
                }
                if (alarm.alarm.ad === 1) {
                  ad = alarmString;
                  adColor = "red";
                } else {
                  ad = okString;
                  adColor = "green";
                }
                if (alarm.alarm.ah === 1) {
                  ah = alarmString;
                  ahColor = "red";
                } else {
                  ah = okString;
                  ahColor = "green";
                }
                if (alarm.alarm.am === 1) {
                  am = alarmString;
                  amColor = "red";
                } else {
                  am = okString;
                  amColor = "green";
                }
                if (alarm.alarm.lf === 1) {
                  lf = alarmString;
                  lfColor = "red";
                } else {
                  lf = okString;
                  lfColor = "green";
                }
                if (alarm.alarm.lh === 1) {
                  lh = alarmString;
                  lhColor = "red";
                } else {
                  lh = okString;
                  lhColor = "green";
                }
                if (alarm.alarm.ll === 1) {
                  ll = alarmString;
                  llColor = "red";
                } else {
                  ll = okString;
                  llColor = "green";
                }
                if (alarm.alarm.ln === 1) {
                  ln = alarmString;
                  lnColor = "red";
                } else {
                  ln = okString;
                  lnColor = "green";
                }
                if (alarm.alarm.ma === 1) {
                  ma = alarmString;
                  maColor = "red";
                } else {
                  ma = okString;
                  maColor = "green";
                }
                if (alarm.alarm.mo === 1) {
                  mo = alarmString;
                  moColor = "red";
                } else {
                  mo = okString;
                  moColor = "green";
                }
                if (alarm.alarm.wh === 1) {
                  wh = alarmString;
                  whColor = "red";
                } else {
                  wh = okString;
                  whColor = "green";
                }
                return (
                  <tr key={key}>
                    <td>{readable}</td>
                    <td style={{ color: acColor }}>{ac}</td>
                    <td style={{ color: adColor }}>{ad}</td>
                    <td style={{ color: ahColor }}>{ah} </td>
                    <td style={{ color: amColor }}>{am}</td>
                    <td style={{ color: lfColor }}>{lf}</td>
                    <td style={{ color: lhColor }}>{lh}</td>
                    <td style={{ color: llColor }}>{ll}</td>
                    <td style={{ color: lnColor }}>{ln}</td>
                    <td style={{ color: maColor }}>{ma}</td>
                    <td style={{ color: moColor }}>{mo}</td>
                    <td style={{ color: whColor }}>{wh}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            )}
          </MDBTableBody>
        </MDBTable>
      </Container>
    </Container>
  );
};

class Alarm extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  readAlarms = () => {
    firebase
      .database()
      .ref("/alarms/timestamped_alarms")
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState({
            alarms: data
          });
        }
      });
  };

  componentDidMount() {
    this.readAlarms();
  }

  render() {
    if (!this.state.alarms) {
      return null;
    } else {
      return <Table alarms={this.state.alarms} />;
    }
  }
}

export default Alarm;
