import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getModules } from '../action'
import { bindActionCreators } from 'redux'
import { Link } from "react-router-dom"
import { Button, Form, Input } from 'antd'
import TextEditor from '../../TextEditor'
import "./styles.scss"
import { setName, setDescription } from './action'
class AddModule extends Component {

    render() {
        const { name, description, setName, setDescription } = this.props;
        return (
            <div className="add-module" style={{ "display": "flex", "flexDirection": "column", justifyContent: "center" }}>
                <Form.Item label="Name" rules={[{ required: true }]} >
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Description">
                    <TextEditor content={description} handleEditorChange={setDescription} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">ADD MODULE</Button>
                </Form.Item>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    name: state.addModuleReducer.name,
    description: state.addModuleReducer.description
})

const mapDispatchToProps = dispatch => ({
    setName: bindActionCreators(setName, dispatch),
    setDescription: bindActionCreators(setDescription, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddModule)
