import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getModules } from '../action'
import { bindActionCreators } from 'redux'
import { Link } from "react-router-dom"
import { Button, Form, Input, notification } from 'antd'
import TextEditor from '../../TextEditor'
import "./styles.scss"
import { setModuleIntroduction, addModule, setModuleName, clearAddModule } from './action'
class AddModule extends Component {

    state = {
        loading: false
    }

    handleSubmit = async () => {
        const { name, introduction, addModule, clearAddModule } = this.props;
        if (name && introduction) {
            this.setState({ loading: true })
            await addModule(name, introduction, this.props.match.params.type);
            this.setState({ loading: false })
            clearAddModule()
            this.props.history.goBack()
        } else {
            this.openNotificationWithIcon('warning', 'Please fill all the fields')
        }
    }

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message,
        });
    };





    render() {
        const { name, introduction, setModuleName, setModuleIntroduction } = this.props;
        return (
            <div className="add-module" style={{ "display": "flex", "flexDirection": "column", justifyContent: "center" }}>
                <Form.Item label="Name" rules={[{ required: true }]} >
                    <Input value={name} onChange={(e) => setModuleName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Description">
                    <TextEditor content={introduction} handleEditorChange={setModuleIntroduction} />
                </Form.Item>
                <Form.Item>
                    <Button loading={this.state.loading} onClick={this.handleSubmit} type="primary" htmlType="submit">ADD MODULE</Button>
                </Form.Item>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    name: state.addModuleReducer.name,
    introduction: state.addModuleReducer.introduction
})

const mapDispatchToProps = dispatch => ({
    setModuleName: bindActionCreators(setModuleName, dispatch),
    setModuleIntroduction: bindActionCreators(setModuleIntroduction, dispatch),
    addModule: bindActionCreators(addModule, dispatch),
    clearAddModule: bindActionCreators(clearAddModule, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddModule)
