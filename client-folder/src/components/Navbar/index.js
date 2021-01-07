import React from "react";
import { Link } from 'react-router-dom';
import "./styles.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/"><h1 className="main-title">Learning Kits Tutorial</h1></Link>
      <div className="spacer"></div>
      <div>About Us</div>
      <div>FAQs</div>
      <div>Language</div>
      <div>Your Dashboard</div>
    </div>
  );
};

export default Navbar;
