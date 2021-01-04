import React from "react";
import "./styles.scss";

const Navbar = () => {
  return (
    <div className="navbar">

      <div className="navbar-main-title">
        <div className="main-title">Learning Kits Tutorial</div>
      </div>

      {/* <div className="spacer"></div> */}

      <div className="navbar-nav-links-container">
        <div className="navbar-nav-link">About Us</div>
        <div className="navbar-nav-link">FAQs</div>
        <div className="navbar-nav-link">Language</div>
        <div className="navbar-nav-link">Your Dashboard</div>
      </div>

    </div>
  );
};

export default Navbar;
