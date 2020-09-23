import React from 'react'
import "./styles.scss"
import { Button } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeCurrentStep, getIntroduction } from '../action'

class Introduction extends React.Component {

    componentDidMount() {
        this.props.getIntroduction(this.props.id)
    }


    render() {

        console.log("from intro", this.props.id)

        const { changeCurrentStep, introduction } = this.props
        console.log("html", introduction)
        return (
            <div className="exp-introduction">
                <div dangerouslySetInnerHTML={{ __html: introduction ? introduction.html : '' }}></div>
                {/* <h3>AIM:
            <span>Welcome to your very first arduino project.This is a simple circuit that lets you blink an LED using arduino. Our primary aim is to light up the LED, wait for a second, turn it off, wait for a second and repeat it again.
            Before you begin, it is important to know the following concepts. If you do not know any of them, click on the link following them to learn more about them.</span></h3>
                <div style={{ fontSize: "24px", marginTop: "40px" }}>Links to study material:</div>
                <div className="study-link"><a href="https://www.arduino.cc/en/guide/introduction">What an arduino is and what it is used for. </a></div>
                <div className="study-link"><a href="https://youtu.be/Yo6JI_bzUzo?t=81">Important parameters of an LED. </a></div>
                <div className="study-link"><a href="https://www.instructables.com/id/How-to-use-a-breadboard/">How  breadboards work.</a></div> */}
                <Button onClick={() => changeCurrentStep('BuildCircuit')} size={"large"} style={{ backgroundColor: "#56AC00", fontSize: "20px", fontWeight: "600", marginTop: "50px", padding: "10px 50px", display: "flex", alignItems: "center" }}>Let's Start Making</Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    introduction: state.courseReducer.introduction
})

const mapDispatchToProps = dispatch => ({
    changeCurrentStep: bindActionCreators(changeCurrentStep, dispatch),
    getIntroduction: bindActionCreators(getIntroduction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Introduction)
