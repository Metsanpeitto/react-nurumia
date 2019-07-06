import React from "react";
import ReactDOM from "react-dom";
import "react-dropdown/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./style.css";

import { withAuthorization } from "../Session";

import App from "./components/App";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";

const HomePage = () =>
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
