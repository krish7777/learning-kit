import React from 'react'
import "./styles.scss"
import { Button, Popover, Upload } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeCurrentStep, getExcercise } from '../action'
import { UploadOutlined } from '@ant-design/icons';


class Excercise extends React.Component {

    componentDidMount() {
        this.props.getExcercise(this.props.id)
    }


    render() {


        const { changeCurrentStep, excercise } = this.props
        console.log("excercise", excercise)
        return (
            <div className="exercise-container">
                <div className="excercise">

                    <div className="excercise-inner">
                        <div>
                            <h2 style={{ color: "white" }}>Try these Excercise Questions</h2>
                            <p>Please upload the photo of the circuit you have built for each excercise question</p>
                        </div>



                        <div className="excercise-list">
                            {excercise?.excercise_list?.map((ex, i) =>
                            (<div className="excercise-item">
                                <div className="excercise-question">{i + 1}.) {ex.question}</div>
                                <div className="excercise-options">
                                    {ex.isUpload ? (
                                        <div className="exercise-buttons-div" >
                                            <Upload >
                                                <Button type="primary" icon={<UploadOutlined />} className="exercise-buttons" >Upload Photo</Button>
                                            </Upload>
                                        </div>
                                    ) : null}
                                    {ex.isCode ? (
                                        <div className="exercise-buttons-div" >
                                            <Upload >
                                                <Button type="primary" icon={<UploadOutlined />} className="exercise-buttons" >Submit Code</Button>
                                            </Upload>
                                        </div>
                                    ) : null}

                                    {ex.hint ? (
                                        <div className="exercise-buttons-div" >
                                            <Popover content={ex.hint} trigger="click">
                                                <Button className="exercise-buttons" >View Hint</Button>
                                            </Popover>
                                        </div>
                                    ) : null}
                                </div>
                            </div>)
                            )}

                        </div>

                        <div className="excercise-files">
                            {excercise?.excerciseFilePaths?.map(ex =>
                                <Button href={ex} target="_blank" className="exercise-download-button">Downloads</Button>
                            )
                            }
                        </div>
                    </div>
                </div>

                <div className="exercise-bottom-buttons">
                    <div onClick={() => { changeCurrentStep('Experiment') }} className="exercise-back-button">
                        BACK TO EXPERIMENT
                    </div>
                    <div className="exercise-contactTeacher-button">
                        CONTACT TEACHER
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    excercise: state.courseReducer.excercise
})

const mapDispatchToProps = dispatch => ({
    changeCurrentStep: bindActionCreators(changeCurrentStep, dispatch),
    getExcercise: bindActionCreators(getExcercise, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Excercise)
