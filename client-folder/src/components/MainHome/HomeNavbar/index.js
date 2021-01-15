import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import React from 'react';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import {Link as ScrollLink} from 'react-scroll';
import { MenuOutlined } from '@ant-design/icons';
import './styles.scss';

class HomeNavbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { windowWidth: window.innerWidth };
    }
    
    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
    }

    render() {

        const { windowWidth } = this.state;
        const { Panel } = Collapse;

        if (windowWidth > 720) {
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
        else {
            return (
                <div className="mainHome-HomeNavbar-collapsable-container">
                    <Collapse 
                        className="mainHome-navbar-collapse" 
                        onChange={this.callback}
                        expandIcon={({ isActive }) => <MenuOutlined rotate={isActive ? 180 : 0} style={windowWidth > 380 ? {fontSize: 28} : {fontSize: 24} } />} 
                        expandIconPosition='right'>
                        <Panel className="mainHome-navbar-panel" header="Learning By Doing" key="1">
                            <div className="HomeNavbar-collapsible-Navlinks-navlink">
                                <ScrollLink to="client-mainhome-mantra" smooth={true}><span>About Us</span></ScrollLink>
                            </div>
                            <div className="HomeNavbar-collapsible-Navlinks-navlink">
                                <ScrollLink to="client-mainhome-ourteam" smooth={true}><span>Our Team</span></ScrollLink>
                            </div>
                            <div className="HomeNavbar-collapsible-Navlinks-navlink">
                                <ScrollLink to="client-mainhome-faq" smooth={true}><span>FAQs</span></ScrollLink>
                            </div>
                            <div className="HomeNavbar-collapsible-Navlinks-navlink">
                                <ScrollLink to="" smooth={true}><span>Sign in</span></ScrollLink>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            )
        }
    }
}

export default HomeNavbar;