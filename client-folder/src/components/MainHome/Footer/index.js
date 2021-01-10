import React, { Component } from 'react';
import './styles.scss';

class Footer extends Component {


    render() {
        return (
            <div className="client-mainHome-footer">
                <div className="mainHome-footer-title">
                    <div>&#169; Learning by doing,2021</div>
                </div>

                <div className="mainHome-footer-Navlinks">
                    <div><span>FAQs</span></div>
                    <div><span>Terms</span></div>
                    <div><span>Contact Us</span></div>
                </div>
            </div>
        )
    }
}

export default Footer;