import React from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";
import SetupGridAdmin from "./components/SetupGridAdmin";

import SetupGridGuest from "./components/SetupGridGuest";

import "../../style.css";

import { AuthUserContext } from "../../../Session";

const Setup = () => (
  <div className="setup-canvas">
    <AuthUserContext.Consumer>
      {authUser => {
        if (authUser.role) {
          console.log(authUser);

          if (authUser.role === "admin") {
            console.log("load as admin");
            return <SetupAdmin {...authUser} />;
          }

          if (authUser.role === "worker") {
            console.log("load as guest");
            return <SetupGuest {...authUser} />;
          }
        }

        console.log(authUser);
      }}
    </AuthUserContext.Consumer>
  </div>
);

const SetupAdmin = authUser => (
  <BrowserRouter>
    <SetupGridAdmin {...authUser} />
  </BrowserRouter>
);

const SetupGuest = () => (
  <BrowserRouter>
    <SetupGridGuest />
  </BrowserRouter>
);

export default Setup;
