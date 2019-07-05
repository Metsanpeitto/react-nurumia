import React from "react";
import { Container, Nav } from "./styled-components";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import "./Logo.png";
import "../style.css";

import { AuthUserContext } from "../Session";

const MyNavigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <Nav className="navbar  navbar-expand-lg fixed-top is-white is-dark-text ">
    <Grid container spacing={10}>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-large font-medium">
          <img alt="" src={require("./Logo.png")} />{" "}
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container
          className="navbar-brand   h1 mb-8 text-small font-medium"
          style={{ paddingTop: 20 }}
        >
          <Link to={ROUTES.LANDING} className="link">
            Landing
          </Link>
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container
          className="navbar-brand   h1 mb-0 text-small font-medium"
          style={{ paddingTop: 20 }}
        >
          <Link to={ROUTES.HOME} className="link">
            Home
          </Link>
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container
          className="navbar-brand   h1 mb-0 text-small font-medium"
          style={{ paddingTop: 20 }}
        >
          <Link to={ROUTES.ACCOUNT} className="link">
            Account
          </Link>
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container
          className="navbar-brand   h1 mb-0 text-small font-medium"
          style={{ paddingTop: 20 }}
        >
          <Link to={ROUTES.ADMIN} className="link">
            Admin
          </Link>
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container
          className="navbar-brand   h1 mb-0 text-small font-medium"
          style={{ paddingTop: "10%" }}
        >
          <SignOutButton />
        </Container>
      </Grid>
    </Grid>
  </Nav>
);

const NavigationNonAuth = () => (
  <Nav className="navbar  navbar-expand-lg fixed-top is-white is-dark-text ">
    <Grid container spacing={10}>
      <Grid
        className="button-lamp-grid"
        item
        xs={2}
        sm={2}
        lg={2}
        xl={2}
        style={{ padding: "4%", paddingLeft: "4%" }}
      >
        <Container className="navbar-brand   h1 mb-0 text-large font-medium">
          <img alt="" src={require("./Logo.png")} />{" "}
        </Container>
      </Grid>
      <Grid
        className="button-lamp-grid"
        item
        xs={2}
        sm={2}
        lg={4}
        xl={4}
        style={{ margin: "1%", padding: "5%" }}
      >
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <Link to={ROUTES.LANDING} className="link-noau" style={{ mar: 90 }}>
            Landing
          </Link>
        </Container>
      </Grid>
      <Grid
        className="button-lamp-grid"
        item
        xs={2}
        sm={2}
        lg={4}
        xl={4}
        style={{ margin: "1%", padding: "5%" }}
      >
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <Link to={ROUTES.SIGN_IN} className="link-noau">
            Sign In
          </Link>
        </Container>
      </Grid>
    </Grid>
  </Nav>
);

export default MyNavigation;
