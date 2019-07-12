import React from "react";
import { Container } from "../styled-components";

const LandingPage = () => (
  <div>
    <Container
      className="is-light-text mb-4 card  is-card-dark"
      style={{ padding: "1%", margin: "5%" }}
    >
      <h1 className="text-large" style={{ textAlign: "center" }}>
        The Project
      </h1>
      <Container
        className="is-light-text mb-4 card  is-card-dark"
        style={{ padding: "1%", margin: "5%" }}
      >
        The Nurumi Project is a prototype greenhouse-controller platform.
        <p>It consists of different parts :</p>
        <ul>- The electronic circuit.</ul>
        <ul>- The mechanical and elecrical side.</ul>{" "}
        <ul>- The Firmware for the electronics.</ul>{" "}
        <ul>- The webApp to show and control the data. </ul>
        <ul>- The server where to store data and functions.</ul>
        <ul>- The Android App with some unique features. </ul>
        <ul>- The GreenHouse to control.</ul>
        <ul>- The e-Commerce app where to network and capitalize.</ul>
        <img alt="" src={require("../../Icons/Logo.png")} />{" "}
      </Container>
    </Container>
  </div>
);

export default LandingPage;
