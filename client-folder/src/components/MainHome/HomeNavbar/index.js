import React from 'react';
import { Link } from 'react-router-dom';
import {Link as ScrollLink} from 'react-scroll';
import './styles.scss';

const HomeNavbar = () => {

    return (
        <div className="mainHome-HomeNavbar-container">
            <div className="HomeNavbar-title">
                <Link to="/"><div>Learning By Doing</div></Link>
            </div>

            <div className="HomeNavbar-Navlinks">
                <div className="HomeNavbar-Navlinks-navlink">
                    <ScrollLink to="client-mainhome-mantra" smooth={true}><span>About Us</span></ScrollLink>
                </div>
                <div className="HomeNavbar-Navlinks-navlink">
                    <ScrollLink to="client-mainhome-ourteam" smooth={true}><span>Our Team</span></ScrollLink>
                </div>
                <div className="HomeNavbar-Navlinks-navlink">
                    <ScrollLink to="client-mainhome-faq" smooth={true}><span>FAQs</span></ScrollLink>
                </div>
                <div className="HomeNavbar-Navlinks-navlink">
                    <ScrollLink to="" smooth={true}><span>Sign in</span></ScrollLink>
                </div>
            </div>
        </div>
    )
}

export default HomeNavbar;