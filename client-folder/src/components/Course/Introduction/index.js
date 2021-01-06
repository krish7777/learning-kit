import React from 'react'
import "./styles.scss"
import { Button } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeCurrentStep, getIntroduction } from '../action'

import sampleImage from './sampleImage.jpg'

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
                <div className="introduction-container-card" dangerouslySetInnerHTML={{ __html: introduction ? introduction.html : '' }}></div>
                
                <div className="introduction-container-card">
                    <div><img src={sampleImage} alt="image" /></div>
                    <Button onClick={() => changeCurrentStep('BuildCircuit')} className="introduction-start-button" size={"large"}>Let's Start Making</Button>
                </div>
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
