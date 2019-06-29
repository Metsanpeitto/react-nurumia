import React from "react";
import { Container, Nav } from "./styled-components";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import SVG from "react-inlinesvg";
import "./Logo.png";

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
          <img src="../Logo.png" />
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
          </li>
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>{" "}
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
          </li>{" "}
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <li>
            <SignOutButton />
          </li>
        </Container>
      </Grid>
    </Grid>
  </Nav>
);

const NavigationNonAuth = () => (
  <Nav className="navbar  navbar-expand-lg fixed-top is-white is-dark-text ">
    <Grid container spacing={10}>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-large font-medium">
          GreenHouse Controller
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
          </li>
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </li>
        </Container>
      </Grid>
    </Grid>
  </Nav>
);

export default MyNavigation;
