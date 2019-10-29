import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import ResponsiveMenu from "react-responsive-navbar";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";

import "./Logo.png";
import "../style.css";

import { AuthUserContext } from "../Session";
import { withAuthentication } from "../Session";

const Menu = styled.div`
  border-bottom: 2px solid #3f52b5;
  margin: 0%;
  background-color: white;
  flex: 1;
  text-align: -webkit-left;
  width: 100%;
  ul {
    padding: 0%;
    margin: 0%;
  }
  li {
    display: inline;
    font-size: 1.125rem;
    list-style-type: none;
    margin: 5%;
  }
  a {
    text-decoration: none;

    font-size: 20px;
    color: #3f52b5;
    &:hover {
      color: #8895dc;
    }
  }
  @media (max-width: 500px) {
    li {
      padding: 10px 0;
      display: block;
      margin-left: 0;
    }
  }
`;

var auth = false;

const MyNavigation = props => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => {
        if (authUser !== null) {
          if (authUser.username !== undefined) {
            auth = true;
            return <NavigationAuth />;
          } else {
            return <NavigationNonAuth />;
          }
        } else {
          return <NavigationNonAuth />;
        }
      }}
    </AuthUserContext.Consumer>
  </div>
);

//{authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
const NavigationAuth = () => (
  <ResponsiveMenu
    menuOpenButton={<FaBars size={30} color="#3f52b5" />}
    menuCloseButton={<FaTimes size={30} color="#3f52b5" />}
    changeMenuOn="500px"
    largeMenuClassName="large-menu-classname"
    smallMenuClassName="small-menu-classname"
    menu={
      <div>
        <Menu>
          <ul className="flex justify-between">
            <Link to={ROUTES.HOME} className="link-logo">
              <img
                style={{
                  paddingLeft: "1%",
                  marginTop: "1%",
                  marginBottom: "0.15%",
                  maxHeight: "50px",
                  minWidth: "200px"
                }}
                alt=""
                src={require("../Logo.png")}
              />
            </Link>
            <Link to={ROUTES.LANDING} className="link">
              The Project
            </Link>
            <Link to={ROUTES.HOME} className="link">
              Home
            </Link>
            <Link to={ROUTES.ACCOUNT} className="link">
              Account
            </Link>
            <SignOutButton />
          </ul>
        </Menu>
      </div>
    }
  />
);

const NavigationNonAuth = props => (
  <ResponsiveMenu
    className="responsive-menu"
    menuOpenButton={<FaBars size={30} color="#3f52b5" />}
    menuCloseButton={<FaTimes size={30} color="#3f52b5" />}
    changeMenuOn="500px"
    largeMenuClassName="large-menu-classname"
    smallMenuClassName="small-menu-classname"
    menu={
      <Menu>
        <ul className="flex justify-between">
          <Link to={ROUTES.LANDING} className="link-logo">
            <img
              style={{
                paddingLeft: "1%",
                marginTop: "1%",
                marginBottom: "0.15%",
                maxHeight: "50px",
                minWidth: "200px"
              }}
              alt=""
              src={require("../Logo.png")}
            />
          </Link>

          <Link to={ROUTES.LANDING} className="link">
            The Project
          </Link>
          <Link to={ROUTES.SIGN_IN} className="link-noau">
            Sign In
          </Link>
        </ul>
      </Menu>
    }
  />
);

const clickHandler = () => (
  <Router>
    <Redirect push to="/" />
    <Route path="/" component={ROUTES.LANDING} />
  </Router>
);

export default withAuthentication(MyNavigation);
