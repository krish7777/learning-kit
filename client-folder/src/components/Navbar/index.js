import {Dropdown} from 'antd';
import React from 'react';
import './styles.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="main-title">Learning Kits Tutorial.</h1>
      <div className="spacer" />

      <div className="options">About Us</div>
      <div className="options">FAQs</div>
      <div className="options">Language</div>
      <div className="options">Your Dashboard</div>
      {/* <span style="display: block; height: 2px; width: 100%; background: white; transition-timing-function: ease; transition-duration: 0.5s; border-radius: 0px; transform-origin: center center; position: absolute; transform: translate3d(0px, 18px, 0px) rotate(0deg); margin-top: -1px;" /> */}

    </div>
  );
};

export default Navbar;
