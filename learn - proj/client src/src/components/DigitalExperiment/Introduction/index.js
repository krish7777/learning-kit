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
            <span>In Combinational Logic we will learn how various gates can be combined in different arrangements to perform various important operations. We will learn about Half Adders and how to implement them using basic logic gates.
</span></h3>
            <p>Half adders are able to add two input bits and return their sum in the form of a two bit number.
            One variant of Half adders looks as given below. The Boolean expressions required to make half adders can be simplified with the help of Karnaugh map.
</p>

            <div style={{ fontSize: "24px", marginTop: "40px" }}>Links to study material:</div>
            <div className="study-link"><a href="https://www.electronics-tutorials.ws/combination/comb_7.html">Web page on Half adders</a></div>
            <div className="study-link"><a href="https://www.youtube.com/watch?v=thkTzdnkL5U">Youtube  video on Half adders </a></div>
            <div className="study-link"><a href="https://www.youtube.com/watch?v=aLUY-s7LSns">Youtube video on Half adders </a></div>
            <Button onClick={() => changeCurrentStep('BuildCircuit')} size={"large"} style={{ backgroundColor: "#56AC00", fontSize: "20px", fontWeight: "600", marginTop: "50px", padding: "10px 50px", display: "flex", alignItems: "center" }}>Let's Start Making</Button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    changeCurrentStep: bindActionCreators(changeCurrentStep, dispatch)
})

export default connect(null, mapDispatchToProps)(Introduction)
