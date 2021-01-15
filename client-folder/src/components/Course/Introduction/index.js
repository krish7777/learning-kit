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
                <div className="introduction-container-card" dangerouslySetInnerHTML={{ __html: introduction ? introduction.html : '' }}>

                </div>
                <Button onClick={() => changeCurrentStep('BuildCircuit')} className="introduction-start-button" size={"large"}>Let's Start Building the circuit</Button>

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
