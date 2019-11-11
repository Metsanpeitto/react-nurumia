import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";
import "./footer.css";

import "../../../style.css";

/**  */

const Footer = () => (
  <div className="footer-canvas ">
    <footer class="footer">
      <div class="footer__addr">
        <h1 className="footer__logo1" style={{ fontFamily: "Pacifico" }}>
          we are here to help you
        </h1>

        <h2 className="footer__contact">Contact</h2>

        <address>
          33670 Waldenberg 70. Morea d'Ayer . Spain
          <a class="footer__btn" href="mailto:admin@nurumia..com">
            Email Us
          </a>
        </address>
      </div>

      <div class="footer__nav">
        <div class="nav__item">
          {" "}
          <h2 class="nav__title">Legal</h2>
          <div class="nav__ul">
            <Link to={ROUTES.PRIVACY} className="fnav__ul__item ">
              Privacy Policy
            </Link>
            <Link to={ROUTES.DISCLAIMER} className="fnav__ul__item ">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>

      <div class="legal">
        <p>&copy; 2019 Nurumia. All rights reserved.</p>
      </div>
      <span class="legal__links ">
        Made with <span class="heart">♥</span> remotely from Waldenberg
      </span>
    </footer>
  </div>
);

export default Footer;
