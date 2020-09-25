import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { getBuildCircuit } from '../action'
import SlideShow from '../SlideShow'
import CodeEditor from '../CodeEditor'
import DigitalImages from '../DigitalImages'

class BuildCircuit extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        this.props.getBuildCircuit(this.props.id)
    }

    render() {
        const { buildCircuit, type } = this.props;
        return (
            <>
                {buildCircuit && type === 'arduino' ? (<> <SlideShow steps={this.props.buildCircuit?.steps} codeStepStart={2} /> <CodeEditor code={this.props.buildCircuit?.code} /></>) : null}
                {buildCircuit && type === 'digital' ? (<><SlideShow steps={this.props.buildCircuit?.steps} codeStepStart={2} /><DigitalImages /></>) : null}
            </>
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
