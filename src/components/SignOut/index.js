import React from "react";
import { withFirebase } from "../Firebase";
import { Button } from "@material-ui/core";
import "../style.css";

const SignOutButton = ({ firebase }) => (
  <div className="signOutButton-canvas">
    <Button
      type="button"
      variant="contained"
      className="signOutButton"
      onClick={firebase.doSignOut}
      style={{
        backgroundColor: "white",
        border: 1
      }}
    >
      SignOut
    </Button>
  </div>
);

export default withFirebase(SignOutButton);
