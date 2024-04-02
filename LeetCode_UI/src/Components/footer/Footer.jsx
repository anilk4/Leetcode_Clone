import React from "react";
import "./Footer.css"; // Importing the CSS file for styling

const Footer = () => {
  return (
    <div className="footer-container">
      <footer>
        <div className="footer-content">
          <div className="logo-container">
            <img
              className="logo"
              alt="logo"
              src="https://shorturl.at/flCS0"
              style={{ maxWidth: "250px", maxHeight: "150px" }}
            />
          </div>
          <div className="description-container">
            <h5 className="footer-title">Treat Code</h5>
            <p>
              Treat code is a clone of LeetCode; code and enjoy its features.
            </p>
          </div>
          <div className="links-container">
            <h5>Product</h5>
            <ul>
              <li><a href="#!">About</a></li>
              <li><a href="#!">Resource</a></li>
              <li><a href="#!">Support</a></li>
              <li><a href="#!">Enterprise</a></li>
            </ul>
          </div>
          <div className="links-container">
            <h5>Links</h5>
            <ul>
              <li><a href="#!">Privacy Policy</a></li>
              <li><a href="#!">Security API</a></li>
              <li><a href="#!"></a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 Copyright:Dummy LeetCode. All Rights Reserved.
          <a href="https://TreatCode.com/"> TreatCode.com</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
