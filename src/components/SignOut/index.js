import React from "react";
import { withFirebase } from "../Firebase";
import { Button } from "@material-ui/core";
import "../style.css";

const SignOutButton = ({ firebase }) => (
  <div className="signOutButton">
    <Button
      type="button"
      variant="contained"
      onClick={firebase.doSignOut}
      style={{
        backgroundColor: "white",
        border: 1,
        maxHeight: "fit-content"
      }}
    >
      SignOut
    </Button>
  </div>
);

export default withFirebase(SignOutButton);
