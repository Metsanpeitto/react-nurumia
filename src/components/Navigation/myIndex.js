import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import ResponsiveMenu from "react-responsive-navbar";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";

import "./Logo.png";
import "../style.css";

import { AuthUserContext } from "../Session";

const Menu = styled.div`
  border-bottom: 2px solid #3f52b5;
  margin: 0;
  background-color: white;

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

const MyNavigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);
const NavigationAuth = () => (
  <ResponsiveMenu
    menuOpenButton={<FaBars size={30} color="#3f52b5" />}
    menuCloseButton={<FaTimes size={30} color="#3f52b5" />}
    changeMenuOn="500px"
    largeMenuClassName="large-menu-classname"
    smallMenuClassName="small-menu-classname"
    style={{ textAlign: "left", width: "100%" }}
    menu={
      <div>
        <Menu>
          <ul>
            <img
              style={{ paddingLeft: "1%" }}
              alt=""
              src={require("./Logo.png")}
            />
            <li>
              {" "}
              <Link to={ROUTES.LANDING} className="link">
                The Project
              </Link>
            </li>
            <li>
              {" "}
              <Link to={ROUTES.HOME} className="link">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link to={ROUTES.ACCOUNT} className="link">
                Account
              </Link>{" "}
            </li>

            <SignOutButton />
          </ul>
        </Menu>
      </div>
    }
  />
);

const NavigationNonAuth = () => (
  <ResponsiveMenu
    className="responsive-menu"
    menuOpenButton={<FaBars size={30} color="#3f52b5" />}
    menuCloseButton={<FaTimes size={30} color="#3f52b5" />}
    changeMenuOn="500px"
    largeMenuClassName="large-menu-classname"
    smallMenuClassName="small-menu-classname"
    menu={
      <Menu>
        <img alt="" src={require("./Logo.png")} />
        <ul>
          <Link to={ROUTES.LANDING} className="link">
            The Project
          </Link>
          <Link to={ROUTES.SIGN_IN} className="link-noau">
            Sign In
          </Link>
        </ul>
        <SignOutButton />
      </Menu>
    }
  />
);

export default MyNavigation;
