import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'antd';
import './styles.scss';

class HomeFAQ extends Component {

    callback = (key) => {
        console.log(key);
    }

    render() {

        const { Panel } = Collapse;

        return (
            <div className="client-mainHome-faq" id="client-mainhome-faq">
                <div className="client-mainHome-faq-title"><h1>FAQs</h1></div>

                <div className="client-maiHome-faq-body">
                    <Collapse className="mainHome-faq-collapse" onChange={this.callback} expandIconPosition='right'>
                        <Panel className="mainHome-faq-panel" header="Q. Click Me to get an answer" key="1">
                            <p>Ha. Ha. Psyche. You get NO answer</p>
                        </Panel>
                        <Panel className="mainHome-faq-panel" header="Q. IDK Maybe Try Again" key="2">
                            <p>Psyche Again.</p>
                        </Panel>
                        <Panel className="mainHome-faq-panel" header="Q. Come on it will work this time." key="3">
                            <p>Get Psyched for a third time. Test Code. Test Code. Test Code. Test Code. Test Code. Test Code. Test Code. Test Code. Test Code. Test Code. Test Code. Test Code. Test Code. 
                            </p>
                        </Panel>
                    </Collapse>
                </div>

                <div className="mainHome-mainProfile-button-container">
                    <Link to="/">   
                        <div className="mainHome-mainProfile-button">
                            <span>View More</span>
                        </div>
                    </Link>
                </div>  
            </div>
        )
    }
}

export default HomeFAQ;