import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as MainProfileButtonVector} from './clientMainHomeOurTeam.svg';
import SirProfilePic from './NatrajanSirProPic.png';
import './styles.scss';


class OurTeam extends Component {


    render() {
        return (
            <div className="client-mainHome-ourTeam" id="client-mainhome-ourteam">
                <div className="client-mainHome-ourTeam-title"><h1>Meet Our Team</h1></div>

                <div className="mainHome-ourTeam-mainProfile">
                    <div className="mainHome-mainProfile-pic">
                        <img src={SirProfilePic}></img>
                    </div>
                    <div className="mainHome-mainProfile-container">
                        <div className="mainHome-mainProfile-name">Prof. Dr. T S Natrajan, IIT Tirupati</div>
                        <div className="mainHome-mainProfile-data">
                            Learning By Doing is an initiative started by Prof. Dr. T S Natrajan and his team at IIT Tirupati, to build a platform to provide a Hands on Experiments and Activities based learning experience for anyone and everyone straignt at your home with an affordable fee and scholarships.  Both the Learning Kit and the e-Learning platform are designed to provide the best experience.
                        </div>
                        <div className="mainHome-mainProfile-button-container">
                            <Link to="/">   
                                <div className="mainHome-mainProfile-button">
                                    <MainProfileButtonVector /><span>GET IN TOUCH</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mainHome-ourTeam-data">
                    <p>
                        <strong>Other Contributors Include:</strong> Manish Prajapti (Hardware designer), Natesh Aravind S (Project Manager), Krishnendu Sudeesh (Lead Developer), Soumitro (Circuit design and content developer), Gautham (Circuit design and content developer), Snegha (Circuit design and content developer), Bhavana (Circuit design and content developer), Dasarai Susreesh (Content Creator), Keerthana (Content Creator), Nobel J Mathews (Web Developer), Sagar Singh(Web Developer), Amit Kesari(Web Developer).
                    </p>
                </div>
            </div>
        )
    }
}

export default OurTeam;