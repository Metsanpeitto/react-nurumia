import React from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";
import { Container } from "../../components/styled-components";
import SetupGrid from "./components/SetupGridAdmin";
import stateSetup from "./components/stateSetup";
import Grid from "@material-ui/core/Grid";
import "../../style.css";

/// Build the SETUP APP functionality.
//   THIS WILL ONLY WORKS FOR ADMINS !!!!
//  It must:         ButtonPanel
//           - Show State of the relays and change the buttons color .DONE
//           - Handle changes in the button state and post them in Firebase

//                  Editable Fields
//           - Show the default states and download the last Firebase state
//           - Filter the inputs and format it .Help with tags .
//           - When Submit ,the form gets uploaded to firebase

class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = stateSetup;
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Grid
            className="setup-main-grid"
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={10}
          >
            <Grid className="setup-time" item xs={7} sm={7} lg={7} xl={7}>
              <Container>
                <SetupGrid />
              </Container>
            </Grid>
          </Grid>
        </BrowserRouter>
      </div>
    );
  }
}

export default Setup;
