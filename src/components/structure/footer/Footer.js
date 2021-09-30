import React from "react";

import "./footer.css";

function Footer() {
  return (
    <footer id="footer-div">
      <span>&#169;</span>
      <a
        href="https://github.com/MFAP-1/so-fit-server"
        style={{ color: "white", paddingRight: "10px" }}
      >
        So Fit.
      </a>
      <span>Copyright 2021: Manoel, Nilton and Raul.</span>
    </footer>
  );
}

export default Footer;
