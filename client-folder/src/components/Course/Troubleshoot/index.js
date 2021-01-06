import React from 'react'
import "./styles.scss"
import { Button, Collapse } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeCurrentStep, getTroubleshoot } from '../action'
const { Panel } = Collapse;

class Troubleshoot extends React.Component {
    state = {
        activeKeys: []
    }

    componentDidMount() {
        this.props.getTroubleshoot(this.props.id)
    }


    render() {


        const { changeCurrentStep, troubleshoot } = this.props
        console.log("troubleshoot", troubleshoot)
        // let active = [];
        // let a = troubleshoot?.faqs?.forEach((faq, i) => {
        //     if (!faq.answer)
        //         active.push(i)
        // })
        // console.log("active", active)
        return (
            <div className="troubleshoot-container">
                <div className="troubleshoot">
                    <div className="troubleshoot-inner">

                        {troubleshoot?.faqs?.map((faq, i) => (

                            faq.question ? (
                                <Collapse ghost expandIconPosition={"right"}>
                                    <Panel header={faq.question} style={{ border: "1px solid #403F3E" }}>
                                        <div className="exp-introduction" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                                    </Panel>
                                </Collapse>
                            ) :
                                <Collapse activeKey={"0"} ghost expandIconPosition={"right"}>
                                    <Panel header={faq.question} style={{ border: "1px solid #403F3E" }}>
                                        <div className="exp-introduction" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                                    </Panel>
                                </Collapse>

                        ))}
                    </div>
                </div>
                <div className="troubleshoot-bottom-buttons">
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    troubleshoot: state.courseReducer.troubleshoot
})

const mapDispatchToProps = dispatch => ({
    changeCurrentStep: bindActionCreators(changeCurrentStep, dispatch),
    getTroubleshoot: bindActionCreators(getTroubleshoot, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Troubleshoot)
