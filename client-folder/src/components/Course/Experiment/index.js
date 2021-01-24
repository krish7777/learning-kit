import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { getExperiment } from '../action'
import SlideShow from '../ExpShow'
import IframeShow from '../IframeShow'
import DigitalGettingStarted from "./DigitalGettingStarted"

class Experiment extends Component {

    componentDidMount() {
        this.props.getExperiment(this.props.id)
    }

    render() {
        const { experiment, type, isGettingStarted, experimentCurrStep, setExperimentStep } = this.props;
        return (
            <>
                {experiment && type === 'arduino' ? (
                    <SlideShow
                        steps={this.props.experiment?.steps}
                        isGettingStarted={isGettingStarted}
                        experimentCurrStep={experimentCurrStep}
                        setExperimentStep={setExperimentStep}
                    />) : null}

                {experiment && type === 'digital' ? isGettingStarted ? (<DigitalGettingStarted
                    steps={this.props.experiment?.steps}
                    isGettingStarted={isGettingStarted}
                    experimentCurrStep={experimentCurrStep}
                    setExperimentStep={setExperimentStep}
                />) : (
                        <SlideShow
                            steps={this.props.experiment?.steps}
                            isGettingStarted={isGettingStarted}
                            experimentCurrStep={experimentCurrStep}
                            setExperimentStep={setExperimentStep}
                        />) : null}
            </>
        )
    }
}

const mapStateToProps = state => ({
    experiment: state.courseReducer.experiment
})

const mapDispatchToProps = dispatch => ({
    getExperiment: bindActionCreators(getExperiment, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Experiment)
