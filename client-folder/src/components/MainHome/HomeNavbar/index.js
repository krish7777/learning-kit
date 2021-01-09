import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

class HomeNavbar extends Component {


    render() {
        return (
            <div className="mainHome-HomeNavbar-container">
                <div className="HomeNavbar-title">
                    <Link to="/"><div>Learning By Doing</div></Link>
                </div>

                <div className="HomeNavbar-Navlinks">
                    <div><span>About Us</span></div>
                    <div><span>Our Team</span></div>
                    <div><span>FAQs</span></div>
                    <div><span>Sign in</span></div>
                </div>
            </div>
        )
    }
}

export default HomeNavbar;