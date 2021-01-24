import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { getSimulation } from '../action'
import IframeShow from '../IframeShow'

class Simulation extends Component {

    componentDidMount() {
        this.props.getSimulation(this.props.id)
    }

    render() {
        const { simulation } = this.props;
        return (
            <>
                {simulation &&
                    <IframeShow
                        steps={this.props.simulation?.steps}
                        simulation={this.props.simulation?.simulationLink}
                        finalMessage={this.props.simulation?.finalMessage}
                    />}
            </>
        )
    }
}

const mapStateToProps = state => ({
    simulation: state.courseReducer.simulation
})

const mapDispatchToProps = dispatch => ({
    getSimulation: bindActionCreators(getSimulation, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Simulation)
