import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { getBuildCircuit } from '../action'
import SlideShow from '../SlideShow'
import CodeEditor from '../CodeEditor'
import DigitalImages from '../DigitalImages'
import './styles.scss'

class BuildCircuit extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        this.props.getBuildCircuit(this.props.id)
    }

    render() {
        console.log("Build Circuit Props");
        console.log(this.props);
        const { buildCircuit, type } = this.props;
        return (
            <div className="build-circuit-main-container">
                    {buildCircuit && type === 'arduino' ? (
                        <>
                            <SlideShow steps={this.props.buildCircuit?.steps} codeStepStart={this.props.buildCircuit?.codeStepStart} rightText="SHOW CODE" /> 
                            <CodeEditor code={this.props.buildCircuit?.code} />
                        </>
                        ) : null}

                    {buildCircuit && type === 'digital' ? (
                        <>
                            <SlideShow steps={this.props.buildCircuit?.steps} finalCircuitStep={this.props.buildCircuit?.finalCircuitStep} rightText="SHOW PIN DIAGRAMS" />
                            <DigitalImages steps={this.props.buildCircuit?.steps} />
                        </>
                        ) : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    buildCircuit: state.courseReducer.buildCircuit
})

const mapDispatchToProps = dispatch => ({
    getBuildCircuit: bindActionCreators(getBuildCircuit, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BuildCircuit)
