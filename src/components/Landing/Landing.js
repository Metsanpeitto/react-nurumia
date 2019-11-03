import React from "react";
import { Container } from "../styled-components";
import "../style.css";

const LandingPage = () => (
  <div style={{ textAlign: "center" }}>
    <Container className="container-landing  is-light-text mb-4   is-card-dark">
      <h1 className="text-large" style={{ textAlign: "center" }}>
        The Project
      </h1>
      <Container
        className="   is-light-text mb-4 user-card  is-card-dark"
        style={{ padding: "1%", margin: "5%" }}
      >
        The Nurumia Project is a prototype greenhouse-controller platform.
        <p>It consists of different parts :</p>
        <ul>- The electronic circuit.</ul>
        <ul>- The mechanical and elecrical side.</ul>{" "}
        <ul>- The Firmware for the electronics.</ul>{" "}
        <ul>- The webApp to show and control the data. </ul>
        <ul>
          - The server where to store data,functions and from where comunicate
          with the workers
        </ul>
        <ul>
          - For a customize experience of the greenhouse workers,a mobileApp
          with especial functions can be developed.
        </ul>
        <ul>
          - A parallel webApp will consist in an e-commerce, where buyers and
          producers can be in contact.{" "}
        </ul>
      </Container>
    </Container>
  </div>
);

export default LandingPage;
