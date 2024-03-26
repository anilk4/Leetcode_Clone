import React from "react";

const Footer = () => {
  return (
    <div>
      <footer
        className="page-footer font-small blue pt-5 bg-dark  "
        style={{ background: "#262020", color: "white" }}
      >
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-1 mt-md-0 mt-3">
              <img
                className="logo"
                alt="logo"
                src="https://shorturl.at/flCS0"
                style={{ maxWidth: "250px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-md-5 mt-md-0 mt-3">
              <h5
                className="text-uppercase"
                style={{
                  fontFamily: "Comic Sans MS, Comic Sans, cursive",
                  fontSize: "xx-large",
                }}
              >
                Treat Code
              </h5>
              <p>
                Teat code is a clone of LeetCode; code and enjoy its features.
              </p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Product</h5>
              <ul className="list-unstyled">
                <li>
                  <a className="text-decoration-none " href="#!">
                    About
                  </a>
                </li>
                <li>
                  <a className="text-decoration-none " href="#!">
                    Resource
                  </a>
                </li>
                <li>
                  <a className="text-decoration-none " href="#!">
                    Support
                  </a>
                </li>
                <li>
                  <a className="text-decoration-none " href="#!">
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a className="text-decoration-none " href="#!">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="text-decoration-none " href="#!">
                    Security
                    AP                  </a>
                </li>
                <li>
                  <a className="text-decoration-none " href="#!">
                    I
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          © 2024 Copyright:Dummy LeetCode. All Rights Reserved.
          <a href="https://TreatCode.com/" className="text-decoration-none ">
            {" "}
            TreatCode.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
