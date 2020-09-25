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
