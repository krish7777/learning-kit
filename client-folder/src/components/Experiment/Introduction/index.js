import React from 'react'
import "./styles.scss"
import { Button } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeCurrentStep } from '../action'

const Introduction = ({ changeCurrentStep }) => {
    return (
        <div className="exp-introduction">
            <h3>AIM:
            <span>Welcome to your very first arduino project.This is a simple circuit that lets you blink an LED using arduino. Our primary aim is to light up the LED, wait for a second, turn it off, wait for a second and repeat it again.
            Before you begin, it is important to know the following concepts. If you do not know any of them, click on the link following them to learn more about them.</span></h3>
            <div style={{ fontSize: "24px", marginTop: "40px" }}>Links to study material:</div>
            <div className="study-link"><a href="https://www.arduino.cc/en/guide/introduction">What an arduino is and what it is used for. </a></div>
            <div className="study-link"><a href="https://youtu.be/Yo6JI_bzUzo?t=81">Important parameters of an LED. </a></div>
            <div className="study-link"><a href="https://www.instructables.com/id/How-to-use-a-breadboard/">How  breadboards work.</a></div>
            <Button onClick={() => changeCurrentStep('BuildCircuit')} size={"large"} style={{ backgroundColor: "#56AC00", fontSize: "20px", fontWeight: "600", marginTop: "50px", padding: "10px 50px", display: "flex", alignItems: "center" }}>Let's Start Making</Button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    changeCurrentStep: bindActionCreators(changeCurrentStep, dispatch)
})

export default connect(null, mapDispatchToProps)(Introduction)
