import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { getExperiment } from '../action'
import SlideShow from '../ExpShow'

class Experiment extends Component {

    componentDidMount() {
        this.props.getExperiment(this.props.id)
    }

    render() {
        const { experiment } = this.props;
        return (
            <>
                {experiment && type === 'digital' ? (<SlideShow steps={this.props.experiment?.steps} codeStepStart={2} />) : null}
                {experiment && type === 'arduino' ? (<SlideShow steps={this.props.experiment?.steps} codeStepStart={2} />) : null}
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
