import React from "react";
import { withFirebase } from "../Firebase";
import { Button } from "@material-ui/core";

const SignOutButton = ({ firebase }) => (
  <Button
    className="signOutbutton"
    type="button"
    variant="contained"
    onClick={firebase.doSignOut}
    style={{
      backgroundColor: "white",
      border: 1,
      maxHeight: "fit-content",
      margin: "1%"
    }}
  >
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
