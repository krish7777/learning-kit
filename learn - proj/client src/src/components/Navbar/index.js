import React from "react";
import "./styles.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="main-title">Learning Kits Tutorial.</h1>
      <div className="spacer"></div>
      <div>About Us</div>
      <div>FAQs</div>
      <div>Language</div>
      <div>Your Dashboard</div>
    </div>
  );
};

export default Navbar;
