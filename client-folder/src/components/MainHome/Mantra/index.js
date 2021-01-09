import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

class Mantra extends Component {


    render() {
        return (
            <div className="client-mainHome-Mantra">
                <p id="Mantra-component-title">Our Mantra</p>
                <div className="Mantra-mainTitle"><h1>Learning By Doing</h1></div>
                <div className="Mantra-data">
                    <p>
                        Our mission and procedure. Learning By Doing is an initiative started by Prof. Dr. T S Natrajan and his team at IIT Tirupati, to build a platform to provide a Hands on Experiments and Activities based learning experience for anyone and everyone straignt at your home with an affordable fee and scholarships. Both the Learning Kit and the e-Learning platform are designed to provide the best experience and understanding of the concepts. Check out the course pages using the links below and experience it for yourself.
                    </p>
                    <p>
                        Learning By Doing is an initiative started by Prof. Dr. T S Natrajan and his team at IIT Tirupati, to build a platform to provide a Hands on Experiments and Activities based learning experience for anyone and everyone straignt at your home with an affordable fee and scholarships. Both the Learning Kit and the e-Learning platform are designed to provide the best experience and understanding of the concepts. Check out the course pages using the links below and experience it for yourself.
                    </p>
                </div>
                <div className="Mantra-demo-blog">
                    <div className="Mantra-blog-text">
                        Have a look at the <strong>free demo</strong> and decide for yourself! we bet you will love this new way of learning by doing Experimentaly!
                    </div>
                    <div className="Mantra-demo-button-container">
                        <Link to="/">   
                            <div className="Mantra-blog-button"><span>View Course Page</span></div>
                        </Link>
                    </div>
                </div>
            </div>  
        )
    }
}

export default Mantra;