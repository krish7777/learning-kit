import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { getExperiment } from '../action'
import SlideShow from '../ExpShow'
import IframeShow from '../IframeShow'
import DigitalGettingStarted from "./DigitalGettingStarted"
import DigitalImages from '../DigitalImages'

class Experiment extends Component {

    componentDidMount() {
        this.props.getExperiment(this.props.id)
    }

    render() {
        const { experiment, type, isGettingStarted, experimentCurrStep, setExperimentStep } = this.props;
        return (
            <>
                {experiment && type === 'arduino' ? (
                    <div className="body-padder">
                        <SlideShow
                            steps={this.props.experiment?.steps}
                            isGettingStarted={isGettingStarted}
                            experimentCurrStep={experimentCurrStep}
                            setExperimentStep={setExperimentStep}
                            sideImages={false}
                        />
                    </div>
                ) : null}

                {experiment && type === 'digital' ? isGettingStarted ? (<div className="body-padder">
                    <DigitalGettingStarted
                        steps={this.props.experiment?.steps}
                        isGettingStarted={isGettingStarted}
                        experimentCurrStep={experimentCurrStep}
                        setExperimentStep={setExperimentStep}
                    />
                </div>) : (
                        <div className="short-padder">
                            <SlideShow
                                steps={this.props.experiment?.steps}
                                isGettingStarted={isGettingStarted}
                                experimentCurrStep={experimentCurrStep}
                                setExperimentStep={setExperimentStep}
                                experimentForm={this.props.experiment?.form}
                                sideImages={true}
                            />

                            {/* <DigitalImages steps={this.props.experiment?.steps} /> */}

                        </div>) : null}
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
