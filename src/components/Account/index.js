import React from "react";

import { AuthUserContext } from "../Session";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization } from "../Session";

import { Container } from "../styled-components";

import "../style.css";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Container
          className="is-light-text mb-4 card  is-card-dark"
          style={{ padding: "1%", margin: "5%" }}
        >
          <Container className="is-dark-text-light letter-spacing text-small">
            <h1 className="text-large" style={{ textAlign: "center" }}>
              Account:
            </h1>
            <h2
              className="text-large"
              style={{ color: "white", textAlign: "center" }}
            >
              {" "}
              {authUser.email}
            </h2>
          </Container>
        </Container>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
