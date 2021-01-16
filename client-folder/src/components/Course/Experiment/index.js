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
        const { experiment, type, overlayUnread, setOverlayUnread, isGettingStarted, experimentCurrStep, setExperimentStep } = this.props;
        return (
            <>
                {experiment && type === 'arduino' ? (<SlideShow steps={this.props.experiment?.steps} codeStepStart={2} overlayUnread={overlayUnread} setOverlayUnread={setOverlayUnread} isGettingStarted={isGettingStarted} experimentCurrStep={experimentCurrStep} setExperimentStep={setExperimentStep} />) : null}
                {experiment && type === 'digital' ? isGettingStarted ? (<DigitalGettingStarted />) : (<IframeShow steps={this.props.experiment?.steps} simulation={this.props.experiment?.simulationLink} finalMessage={this.props.experiment?.finalMessage} overlayUnread={overlayUnread} setOverlayUnread={setOverlayUnread} isGettingStarted={isGettingStarted} experimentForm={this.props.experiment?.form} />) : null}
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
