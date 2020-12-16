import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextEditor from '../../TextEditor'
import { bindActionCreators } from 'redux'
import { Input, Form, Button, notification, Upload, Checkbox } from 'antd'
import { addExcercise, clearExcercise, getExcercise } from '../action'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from "axios"
import imageCompression from 'browser-image-compression';

import { baseUrl } from '../../../config';

class AddExcercise extends Component {

    state = {
        loading: false
    }


    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message,
        });
    };


    componentDidMount() {
        if (this.props.currentCourse.excercise) {
            console.log("has excercise, gotta call server")
            this.props.getExcercise(this.props.currentCourse.excercise)
        } else {
            console.log("does not ahve any excercise astart from the first")
        }
    }

    componentWillUnmount() {
        this.props.clearExcercise();
    }

    render() {
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 2 },
            },
        };

        console.log("in render")
        console.log(this.props.currentCourse)

        const options = {
            maxSizeMB: 1,
            // maxWidthOrHeight: 720,
            useWebWorker: true
        }

        const normFile = e => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };

        if (this.props.currentCourse.excercise && this.props.excercise) {
            console.log("FIRST FORM")

            return (
                <div style={{ width: "800px", margin: "auto", padding: "20px 0" }}>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form initialValues={this.props.excercise} onFinish={async (val) => {
                        const { excercise_list, excerciseFiles } = val;
                        console.log(excercise_list);
                        let newExcerciseFiles = []
                        let excerciseFilePaths = []
                        if (excerciseFiles) {
                            newExcerciseFiles = excerciseFiles.map(file => ({
                                name: file.name,
                                response: file.response,
                                uid: file.uid,
                                status: file.status,
                            }))

                            excerciseFilePaths = excerciseFiles.map(file => (
                                file.response.location
                            ))
                        }

                        console.log("files", newExcerciseFiles)
                        console.log("paths", excerciseFilePaths)
                        if (excercise_list.length) {
                            this.setState({ loading: true })
                            await this.props.addExcercise(this.props.match.params.id, excercise_list, newExcerciseFiles, excerciseFilePaths, this.props.currentCourse.excercise)
                            this.setState({ loading: false })
                            this.props.clearExcercise()
                            this.props.history.goBack()
                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one step is there')
                        }
                    }}>
                        <Form.Item
                            valuePropName="fileList"
                            name="excerciseFiles"
                            getValueFromEvent={normFile}
                        >
                            <Upload multiple={false} accept=".pdf"
                                name="file" customRequest={async ({ file, onSuccess, onError }) => {
                                    let formData = new FormData()
                                    formData.set('expId', '123')
                                    formData.append('file', file)

                                    await axios.post(`${baseUrl}/api/upload/excercise`, formData).then(res => {
                                        onSuccess(res.data)
                                        console.log(res.data)
                                    }).catch(err => { console.log("error in uploading"); onError("Error in uploading.Try again") })
                                }}
                            // listType="picture"
                            >
                                <Button>
                                    <UploadOutlined /> Upload Files(Optional)
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.List name="excercise_list" label="excercise_list" rules={[{ required: true }]}>
                            {(fields, { add, remove }) => {
                                return (
                                    <div>
                                        {fields.map((field, index) => (
                                            <div key={"unique" + index} style={{ display: 'flex', alignItems: "center", }} >
                                                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                                    <Form.Item
                                                        label={`Question${index + 1}`}
                                                        {...field}
                                                        key={"desc" + index}
                                                        name={[field.name, 'question']}
                                                        fieldKey={[field.fieldKey, 'question']}
                                                        rules={[{ required: true, message: 'Missing Question' }]}
                                                    >
                                                        <Input.TextArea style={{ width: "90%" }} autoSize={{ minRows: 2 }} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label={`Hint${index + 1}`}
                                                        {...field}
                                                        key={"desc-hint" + index}
                                                        name={[field.name, 'hint']}
                                                        fieldKey={[field.fieldKey, 'hint']}
                                                    // rules={[{ required: true, message: 'Missing Hint' }]}
                                                    >
                                                        <Input.TextArea style={{ width: "90%" }} autoSize={{ minRows: 2 }} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label={`Upload Needed? `}
                                                        {...field}
                                                        key={"desc-isUpload" + index}
                                                        name={[field.name, 'isUpload']}
                                                        fieldKey={[field.fieldKey, 'isUpload']}
                                                        valuePropName="checked"
                                                        initialValue={false}

                                                    >
                                                        <Checkbox />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label={`Code Needed ?`}
                                                        {...field}
                                                        key={"desc-isCode" + index}
                                                        name={[field.name, 'isCode']}
                                                        fieldKey={[field.fieldKey, 'isCode']}
                                                        valuePropName="checked"
                                                        initialValue={false}

                                                    >
                                                        <Checkbox />
                                                    </Form.Item>
                                                </div>


                                                <MinusCircleOutlined
                                                    style={{ color: "red", fontSize: "20px" }}
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            </div>

                                        ))}
                                        <Form.Item {...formItemLayoutWithOutLabel}>
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add();
                                                }}
                                                style={{ width: '60%', alignSelf: "center" }}
                                            >
                                                <PlusOutlined /> Add Step
                                        </Button>
                                        </Form.Item>
                                    </div>
                                );
                            }}
                        </Form.List>

                        <Form.Item>
                            <Button loading={this.state.loading} type="primary" htmlType="submit">Add/Update</Button>
                        </Form.Item>
                        <p>***Update only if any changes are made, otherwise it may take time***</p>

                    </Form>
                </div>
            )
        } else if (!this.props.currentCourse.excercise) {
            console.log("SECOND FORM")
            return (
                <div style={{ width: "800px", margin: "auto", padding: "20px 0" }}>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form onFinish={async (val) => {
                        console.log("valllll", val)
                        const { excercise_list, excerciseFiles } = val;
                        // console.log("list", excercise_list)
                        // console.log("files", excerciseFiles)
                        let newExcerciseFiles = []
                        let excerciseFilePaths = []
                        if (excerciseFiles) {
                            newExcerciseFiles = excerciseFiles.map(file => ({
                                name: file.name,
                                response: file.response,
                                uid: file.uid,
                                status: file.status,
                            }))

                            excerciseFilePaths = excerciseFiles.map(file => (
                                file.response.location
                            ))
                        }

                        console.log("files", newExcerciseFiles)
                        console.log("paths", excerciseFilePaths)

                        if (excercise_list?.length) {

                            this.setState({ loading: true })
                            await this.props.addExcercise(this.props.match.params.id, excercise_list, newExcerciseFiles, excerciseFilePaths, this.props.currentCourse.excercise)
                            this.setState({ loading: false })
                            this.props.clearExcercise()
                            this.props.history.goBack()
                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one step is there')

                        }


                    }}>

                        <Form.Item
                            valuePropName="fileList"
                            name="excerciseFiles"
                            getValueFromEvent={normFile}
                        >
                            <Upload multiple={false} accept=".pdf"
                                name="file" customRequest={async ({ file, onSuccess, onError }) => {
                                    let formData = new FormData()
                                    formData.set('expId', '123')
                                    formData.append('file', file)

                                    await axios.post(`${baseUrl}/api/upload/excercise`, formData).then(res => {
                                        onSuccess(res.data)
                                        console.log(res.data)
                                    }).catch(err => { console.log("error in uploading"); onError("Error in uploading.Try again") })
                                }}
                            // listType="picture"
                            >
                                <Button>
                                    <UploadOutlined /> Upload Files(Optional)
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.List name="excercise_list" label="excercise_list" rules={[{ required: true }]}>
                            {(fields, { add, remove }) => {
                                return (
                                    <div>
                                        {fields.map((field, index) => (
                                            <div key={"unique" + index} style={{ display: 'flex', alignItems: "center", }} >
                                                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                                    <Form.Item
                                                        label={`Question${index + 1}`}
                                                        {...field}
                                                        key={"desc-question" + index}
                                                        name={[field.name, 'question']}
                                                        fieldKey={[field.fieldKey, 'question']}
                                                        rules={[{ required: true, message: 'Missing Question' }]}
                                                    >
                                                        <Input.TextArea style={{ width: "90%" }} autoSize={{ minRows: 2 }} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label={`Hint${index + 1}`}
                                                        {...field}
                                                        key={"desc-hint" + index}
                                                        name={[field.name, 'hint']}
                                                        fieldKey={[field.fieldKey, 'hint']}
                                                    // rules={[{ required: true, message: 'Missing hint' }]}
                                                    >
                                                        <Input.TextArea style={{ width: "90%" }} autoSize={{ minRows: 2 }} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label={`Upload Needed ?`}
                                                        {...field}
                                                        key={"desc-isUpload" + index}
                                                        name={[field.name, 'isUpload']}
                                                        fieldKey={[field.fieldKey, 'isUpload']}
                                                        valuePropName="checked"
                                                        initialValue={false}

                                                    >
                                                        <Checkbox />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label={`Code Needed ?`}
                                                        {...field}
                                                        key={"desc-isCode" + index}
                                                        name={[field.name, 'isCode']}
                                                        fieldKey={[field.fieldKey, 'isCode']}
                                                        valuePropName="checked"
                                                        initialValue={false}


                                                    >
                                                        <Checkbox />
                                                    </Form.Item>
                                                </div>


                                                <MinusCircleOutlined
                                                    style={{ color: "red", fontSize: "20px" }}
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            </div>

                                        ))}
                                        <Form.Item {...formItemLayoutWithOutLabel}>
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add();
                                                }}
                                                style={{ width: '60%', alignSelf: "center" }}
                                            >
                                                <PlusOutlined /> Add Step
                                        </Button>
                                        </Form.Item>
                                    </div>
                                );
                            }}
                        </Form.List>

                        <Form.Item>
                            <Button loading={this.state.loading} type="primary" htmlType="submit">Add/Update</Button>
                        </Form.Item>
                    </Form>
                </div>)
        }
        else {
            console.log("DSadasd")
            return null;
        }
    }
}

const mapStateToProps = state => ({
    currentCourse: state.courseReducer.currentCourse,
    excercise: state.courseReducer.excercise
})

const mapDispatchToProps = dispatch => ({
    getExcercise: bindActionCreators(getExcercise, dispatch),
    addExcercise: bindActionCreators(addExcercise, dispatch),
    clearExcercise: bindActionCreators(clearExcercise, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddExcercise)