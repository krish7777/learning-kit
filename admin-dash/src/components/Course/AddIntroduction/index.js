import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextEditor from '../../TextEditor'
import { bindActionCreators } from 'redux'
import { setIntroductionHtml, addIntroduction, getIntroduction, clearIntroduction } from '../action'
import { Form, Button, notification } from 'antd'

class AddIntroduction extends Component {

    state = {
        loading: false
    }

    handleSubmit = async () => {
        const { introductionHtml, addIntroduction, clearIntroduction, currentCourse } = this.props;
        if (introductionHtml) {
            this.setState({ loading: true })
            await addIntroduction(this.props.match.params.id, introductionHtml, currentCourse.introduction)
            this.setState({ loading: false })
            clearIntroduction()
            // this.props.history.push(`/course/${this.props.match.params.id}`)
            this.props.history.goBack();
        } else {
            this.openNotificationWithIcon('warning', 'Please fill all the fields')
        }
    }

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message,
        });
    };


    componentDidMount() {
        if (this.props.currentCourse.introduction) {
            console.log("has introduction, gotta call server")
            this.props.getIntroduction(this.props.currentCourse.introduction)
        } else {
            console.log("does not ahve any introduction astart from the first")
        }
    }

    componentWillUnmount() {
        //????
        this.props.clearIntroduction();
    }

    render() {
        const { introductionHtml, setIntroductionHtml } = this.props;
        return (
            <div>

                INTROD
                <div classname="add-module" style={{ "display": "flex", "flexDirection": "column", justifyContent: "center" }}>
                    <Form.Item label="Introduction">
                        <TextEditor content={introductionHtml} handleEditorChange={setIntroductionHtml}></TextEditor>
                    </Form.Item>
                    <Form.Item>
                        <Button loading={this.state.loading} onClick={this.handleSubmit} type="primary" htmlType="submit">ADD/SAVE INTRODUCTION</Button>
                    </Form.Item>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentCourse: state.courseReducer.currentCourse,
    introductionHtml: state.courseReducer.introductionHtml
})

const mapDispatchToProps = dispatch => ({
    setIntroductionHtml: bindActionCreators(setIntroductionHtml, dispatch),
    addIntroduction: bindActionCreators(addIntroduction, dispatch),
    getIntroduction: bindActionCreators(getIntroduction, dispatch),
    clearIntroduction: bindActionCreators(clearIntroduction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddIntroduction)