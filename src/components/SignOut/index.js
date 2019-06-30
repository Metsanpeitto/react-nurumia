import React from "react";
import { withFirebase } from "../Firebase";
import { Button } from "@material-ui/core";

const SignOutButton = ({ firebase }) => (
  <Button
    type="button"
    onClick={firebase.doSignOut}
    style={{ backgroundColor: "gray" }}
  >
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
