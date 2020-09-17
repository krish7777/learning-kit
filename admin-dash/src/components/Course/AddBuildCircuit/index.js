import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Upload, notification } from "antd";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from "axios"
import imageCompression from 'browser-image-compression';
import { bindActionCreators } from 'redux';
import { addBuildCircuit, clearBuildCircuit, getBuildCircuit } from '../action';

class AddBuildCircuit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        if (this.props.currentCourse.buildCircuit) {
            console.log("has buildcircuit, gotta call server")
            this.props.getBuildCircuit(this.props.currentCourse.buildCircuit)
        } else {
            console.log("does not ahve any buildckt astart from the first")
        }
    }


    componentWillReceiveProps(pres, next) {
        console.log("pres", pres)
        console.log("next", next)
    }



    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message,
        });
    };


    render() {
        console.log("render of add build", this.props.buildCircuit)

        const options = {
            maxSizeMB: 1,
            // maxWidthOrHeight: 720,
            useWebWorker: true
        }
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 2 },
            },
        };
        const normFile = e => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
                return e;
            }
            if (e.fileList.length > 1) {
                e.fileList.shift();
            }
            console.log("called")
            return e && e.fileList;
        };
        if (this.props.currentCourse.buildCircuit && this.props.buildCircuit) {
            console.log("FIRST FORM")

            return (
                <div style={{ width: "800px", margin: "auto", padding: "20px 0" }}>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form initialValues={this.props.buildCircuit} onFinish={async (val) => {
                        console.log("valllll", val)
                        const { steps } = val;
                        let success = 1;
                        if (steps.length) {
                            let newSteps = steps.map(step => {
                                const { upload_image, upload_side, description } = step;
                                if (upload_side && upload_side.length && upload_image[0].response && upload_image[0].response.location && upload_side[0].response && upload_side[0].response.location)
                                    return {
                                        description,
                                        upload_image: [{
                                            name: upload_image[0].name,
                                            // originalFileObj: upload_image[0].originalFileObj,
                                            response: upload_image[0].response,
                                            status: upload_image[0].status,
                                            thumbUrl: upload_image[0].thumbUrl,
                                            uid: upload_image[0].uid
                                        }],
                                        imagePath: upload_image[0].response.location,
                                        upload_side: [{
                                            name: upload_side[0].name,
                                            // originalFileObj: upload_side[0].originalFileObj,
                                            response: upload_side[0].response,
                                            status: upload_side[0].status,
                                            thumbUrl: upload_side[0].thumbUrl,
                                            uid: upload_side[0].uid
                                        }],
                                        sideImagePath: upload_image[0].response.location
                                    }
                                else if (upload_image[0].response && upload_image[0].response.location) {
                                    return {
                                        description,
                                        upload_image: [{
                                            name: upload_image[0].name,
                                            // originalFileObj: upload_image[0].originalFileObj,
                                            response: upload_image[0].response,
                                            status: upload_image[0].status,
                                            thumbUrl: upload_image[0].thumbUrl,
                                            uid: upload_image[0].uid
                                        }],
                                        imagePath: upload_image[0].response.location,
                                    }

                                }
                                else {
                                    success = 0;
                                }
                            }
                            )
                            if (success) {
                                this.setState({ ans: { steps: newSteps } });
                                console.log({ steps: newSteps })
                                // axios.post('http://localhost:3300/course/buildCircuit', { course_id: "5f1ef04ec0f8f301d4f0668f", steps: newSteps })
                                //     .then(res => console.log("hmm seems fine"))
                                //     .catch(err => console.log("error in adding"))
                                this.setState({ loading: true })
                                await this.props.addBuildCircuit(this.props.match.params.id, newSteps, this.props.currentCourse.buildCircuit)
                                this.setState({ loading: false })
                                console.log("abt to cler")
                                this.props.clearBuildCircuit()
                                console.log("abt to go back")
                                this.props.history.goBack()
                            }
                            else {
                                this.openNotificationWithIcon('error', 'Please make sure all the images have been successfully uploaded')

                            }
                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one step is there')

                        }


                    }}>
                        <Form.List name="steps" label="steps" rules={[{ required: true }]}>
                            {(fields, { add, remove }) => {
                                return (
                                    <div>
                                        {fields.map((field, index) => (
                                            <div key={"unique" + index} style={{ display: 'flex', alignItems: "center", }} >
                                                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                                    <Form.Item
                                                        label={`Step${index + 1}`}
                                                        {...field}
                                                        key={"desc" + index}
                                                        name={[field.name, 'description']}
                                                        fieldKey={[field.fieldKey, 'description']}
                                                        rules={[{ required: true, message: 'Missing Step Description' }]}
                                                    >
                                                        <Input.TextArea style={{ width: "90%" }} autoSize={{ minRows: 2 }} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        key={"upload_image" + index}
                                                        {...formItemLayoutWithOutLabel}
                                                        name={[field.name, 'upload_image']}
                                                        valuePropName="fileList"
                                                        getValueFromEvent={normFile}
                                                        fieldKey={[field.fieldKey, 'upload_image']}
                                                        rules={[{ required: true, message: 'Missing Image!' }]}
                                                    >
                                                        <Upload multiple={false} accept=".png"
                                                            name="file" customRequest={async ({ file, onSuccess, onError }) => {
                                                                const compressedFile = await imageCompression(file, options);
                                                                console.log("before compeee")
                                                                console.log('originalFile instanceof Blob', file instanceof Blob); // true
                                                                console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
                                                                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                                                                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
                                                                let formData = new FormData()
                                                                formData.set('expId', '123')
                                                                formData.append('file', compressedFile)
                                                                await axios.post('http://localhost:3300/upload/experiment', formData).then(res => {
                                                                    onSuccess(res.data)
                                                                    console.log(res.data)
                                                                }).catch(err => { console.log("error in uploading"); onError("Error in uploading.Try again") })
                                                            }}
                                                            listType="picture"
                                                        >
                                                            <Button>
                                                                <UploadOutlined /> Upload Image
                                                        </Button>
                                                        </Upload>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        key={"upload_side" + index}
                                                        {...formItemLayoutWithOutLabel}
                                                        name={[field.name, 'upload_side']}
                                                        valuePropName="fileList"
                                                        getValueFromEvent={normFile}
                                                        fieldKey={[field.fieldKey, 'upload_side']}
                                                    >
                                                        <Upload multiple={false} accept=".png"
                                                            name="file" customRequest={async ({ file, onSuccess, onError }) => {
                                                                const compressedFile = await imageCompression(file, options);
                                                                console.log("before compeee")
                                                                console.log('originalFile instanceof Blob', file instanceof Blob); // true
                                                                console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
                                                                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                                                                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
                                                                let formData = new FormData()
                                                                formData.set('expId', '123')
                                                                formData.append('file', compressedFile)
                                                                await axios.post('http://localhost:3300/upload/experiment', formData).then(res => {
                                                                    onSuccess(res.data)
                                                                    console.log(res.data)
                                                                }).catch(err => { console.log("error in uploading"); onError("Error in uploading.Try again") })
                                                            }}
                                                            listType="picture"
                                                        >
                                                            <Button>
                                                                <UploadOutlined /> Upload Side Image (if any)
                                                        </Button>
                                                        </Upload>
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
        }
        else if (!this.props.currentCourse.buildCircuit) {
            console.log("SECOND FORM")
            return (
                <div style={{ width: "800px", margin: "auto", padding: "20px 0" }}>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form onFinish={async (val) => {
                        console.log("valllll", val)
                        const { steps } = val;
                        let success = 1;
                        if (steps.length) {
                            let newSteps = steps.map(step => {
                                const { upload_image, upload_side, description } = step;
                                if (upload_side && upload_side.length && upload_image[0].response && upload_image[0].response.location && upload_side[0].response && upload_side[0].response.location)
                                    return {
                                        description,
                                        upload_image: [{
                                            name: upload_image[0].name,
                                            // originalFileObj: upload_image[0].originalFileObj,
                                            response: upload_image[0].response,
                                            status: upload_image[0].status,
                                            thumbUrl: upload_image[0].thumbUrl,
                                            uid: upload_image[0].uid
                                        }],
                                        imagePath: upload_image[0].response.location,
                                        upload_side: [{
                                            name: upload_side[0].name,
                                            // originalFileObj: upload_side[0].originalFileObj,
                                            response: upload_side[0].response,
                                            status: upload_side[0].status,
                                            thumbUrl: upload_side[0].thumbUrl,
                                            uid: upload_side[0].uid
                                        }],
                                        sideImagePath: upload_image[0].response.location
                                    }
                                else if (upload_image[0].response && upload_image[0].response.location) {
                                    return {
                                        description,
                                        upload_image: [{
                                            name: upload_image[0].name,
                                            // originalFileObj: upload_image[0].originalFileObj,
                                            response: upload_image[0].response,
                                            status: upload_image[0].status,
                                            thumbUrl: upload_image[0].thumbUrl,
                                            uid: upload_image[0].uid
                                        }],
                                        imagePath: upload_image[0].response.location,
                                    }

                                }
                                else {
                                    success = 0;
                                }
                            }
                            )
                            if (success) {
                                this.setState({ ans: { steps: newSteps } });
                                console.log({ steps: newSteps })
                                // axios.post('http://localhost:3300/course/buildCircuit', { course_id: "5f1ef04ec0f8f301d4f0668f", steps: newSteps })
                                //     .then(res => console.log("hmm seems fine"))
                                //     .catch(err => console.log("error in adding"))
                                this.setState({ loading: true })
                                await this.props.addBuildCircuit(this.props.match.params.id, newSteps,this.props.currentCourse.buildCircuit)
                                this.setState({ loading: false })
                                console.log("abt to cler")
                                this.props.clearBuildCircuit()
                                console.log("abt to go back")
                                this.props.history.goBack()
                            }
                            else {
                                this.openNotificationWithIcon('error', 'Please make sure all the images have been successfully uploaded')

                            }
                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one step is there')

                        }


                    }}>
                        <Form.List name="steps" label="steps" rules={[{ required: true }]}>
                            {(fields, { add, remove }) => {
                                return (
                                    <div>
                                        {fields.map((field, index) => (
                                            <div key={"unique" + index} style={{ display: 'flex', alignItems: "center", }} >
                                                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                                    <Form.Item
                                                        label={`Step${index + 1}`}
                                                        {...field}
                                                        key={"desc" + index}
                                                        name={[field.name, 'description']}
                                                        fieldKey={[field.fieldKey, 'description']}
                                                        rules={[{ required: true, message: 'Missing Step Description' }]}
                                                    >
                                                        <Input.TextArea style={{ width: "90%" }} autoSize={{ minRows: 2 }} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        key={"upload_image" + index}
                                                        {...formItemLayoutWithOutLabel}
                                                        name={[field.name, 'upload_image']}
                                                        valuePropName="fileList"
                                                        getValueFromEvent={normFile}
                                                        fieldKey={[field.fieldKey, 'upload_image']}
                                                        rules={[{ required: true, message: 'Missing Image!' }]}
                                                    >
                                                        <Upload multiple={false} accept=".png"
                                                            name="file" customRequest={async ({ file, onSuccess, onError }) => {
                                                                const compressedFile = await imageCompression(file, options);
                                                                console.log("before compeee")
                                                                console.log('originalFile instanceof Blob', file instanceof Blob); // true
                                                                console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
                                                                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                                                                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
                                                                let formData = new FormData()
                                                                formData.set('expId', '123')
                                                                formData.append('file', compressedFile)
                                                                await axios.post('http://localhost:3300/upload/experiment', formData).then(res => {
                                                                    onSuccess(res.data)
                                                                    console.log(res.data)
                                                                }).catch(err => { console.log("error in uploading"); onError("Error in uploading.Try again") })
                                                            }}
                                                            listType="picture"
                                                        >
                                                            <Button>
                                                                <UploadOutlined /> Upload Image
                                                        </Button>
                                                        </Upload>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        key={"upload_side" + index}
                                                        {...formItemLayoutWithOutLabel}
                                                        name={[field.name, 'upload_side']}
                                                        valuePropName="fileList"
                                                        getValueFromEvent={normFile}
                                                        fieldKey={[field.fieldKey, 'upload_side']}
                                                    >
                                                        <Upload multiple={false} accept=".png"
                                                            name="file" customRequest={async ({ file, onSuccess, onError }) => {
                                                                const compressedFile = await imageCompression(file, options);
                                                                console.log("before compeee")
                                                                console.log('originalFile instanceof Blob', file instanceof Blob); // true
                                                                console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
                                                                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                                                                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
                                                                let formData = new FormData()
                                                                formData.set('expId', '123')
                                                                formData.append('file', compressedFile)
                                                                await axios.post('http://localhost:3300/upload/experiment', formData).then(res => {
                                                                    onSuccess(res.data)
                                                                    console.log(res.data)
                                                                }).catch(err => { console.log("error in uploading"); onError("Error in uploading.Try again") })
                                                            }}
                                                            listType="picture"
                                                        >
                                                            <Button>
                                                                <UploadOutlined /> Upload Side Image (if any)
                                                        </Button>
                                                        </Upload>
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
                </div>)
        }
        else {
            return null;
        }

    }
}


const mapStateToProps = state => ({
    currentCourse: state.courseReducer.currentCourse,
    buildCircuit: state.courseReducer.buildCircuit

})

const mapDispatchToProps = dispatch => ({
    addBuildCircuit: bindActionCreators(addBuildCircuit, dispatch),
    clearBuildCircuit: bindActionCreators(clearBuildCircuit, dispatch),
    getBuildCircuit: bindActionCreators(getBuildCircuit, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBuildCircuit)