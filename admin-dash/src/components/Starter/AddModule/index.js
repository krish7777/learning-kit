import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Input, notification } from 'antd'
import TextEditor from '../../TextEditor'
import "./styles.scss"
import { setModuleIntroduction, addModule, setModuleName, clearAddModule } from './action'
import { GETTINGSTARTED } from '../../../config'
class AddModuleConf extends Component {

    state = {
        loading: false
    }

    handleSubmit = async () => {
        const { introduction, addModule, clearAddModule } = this.props;
        const name = GETTINGSTARTED;
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
                <Form
                initialValues={{
                    ["name"]: GETTINGSTARTED
                }}
                >
                <Form.Item label="Name" name="name" rules={[{ required: true }]} >
                    <Input readOnly={true}/>
                </Form.Item>
                <Form.Item label="Description">
                    <TextEditor content={introduction} handleEditorChange={setModuleIntroduction} />
                </Form.Item>
                <Form.Item>
                    <Button loading={this.state.loading} onClick={this.handleSubmit} type="primary" htmlType="submit">ADD MODULE</Button>
                </Form.Item>
                </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddModuleConf)
