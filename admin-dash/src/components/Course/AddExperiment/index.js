import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addExperiment, clearExperiment, getExperiment } from '../action';
import axios from "axios"
import imageCompression from 'browser-image-compression';

import { Form, Input, Button, notification, Upload } from "antd";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { baseUrl } from '../../../config';

class AddExperiment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        if (this.props.currentCourse.experiment) {
            console.log("has experiment, gotta call server")
            this.props.getExperiment(this.props.currentCourse.experiment)
        } else {
            console.log("does not have any experiment start from the first")
        }
    }

    componentWillUnmount() {
        this.props.clearExperiment()
    }

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message,
        });
    };


    render() {
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 2 },
            },
        };
        console.log(this.props.location.state?.gettingStarted)
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
            if (e.fileList.length > 1) {
                e.fileList.shift();
            }
            console.log("called")
            return e && e.fileList;
        };

        if (this.props.currentCourse.experiment && this.props.experiment) {
            console.log("FIRST FORM")

            return (
                <div style={{ margin: "3%", padding: "2% ", border: "2px solid black" }}>
                    <h2>{this.props.currentCourse.name.toUpperCase()} : Experiment</h2>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form initialValues={this.props.experiment} onFinish={async (val) => {
                        console.log("valllll", val)
                        const { steps, simulationLink, finalMessage } = val;
                        let success = 1;
                        if (steps.length) {

                            let newSteps;

                            if (this.props.match.params.type === "arduino") {
                                newSteps = steps.map(step => {
                                    const { upload_image, description } = step;
                                    if (upload_image && upload_image[0].response && upload_image[0].response.location) {
                                        return {
                                            description,
                                            upload_image: [{
                                                name: upload_image[0].name,
                                                response: upload_image[0].response,
                                                status: upload_image[0].status,
                                                thumbUrl: upload_image[0].thumbUrl,
                                                uid: upload_image[0].uid
                                            }],
                                            imagePath: upload_image[0].response.location
                                        }

                                    }
                                    else {
                                        success = 0;
                                    }
                                })
                            } else if (this.props.location.state?.gettingStarted) {
                                newSteps = steps.map(step => {
                                    const { upload_image, description, simulationLink } = step;
                                    if (simulationLink) {
                                        return {
                                            description,
                                            simulationLink
                                        }
                                    }
                                    else if (upload_image && upload_image.length && upload_image[0].response && upload_image[0].response.location) {
                                        return {
                                            description,
                                            upload_image: [{
                                                name: upload_image[0].name,
                                                response: upload_image[0].response,
                                                status: upload_image[0].status,
                                                thumbUrl: upload_image[0].thumbUrl,
                                                uid: upload_image[0].uid,
                                            }],
                                            imagePath: upload_image[0].response.location
                                        }
                                    }
                                    else {
                                        success = 0
                                    }
                                })
                            }
                            else {
                                newSteps = steps;
                            }



                            if (success) {

                                this.setState({ loading: true })
                                await this.props.addExperiment(this.props.match.params.id, newSteps, simulationLink, finalMessage, this.props.currentCourse.experiment)
                                this.setState({ loading: false })
                                console.log("aboutt to cler")
                                this.props.clearExperiment()
                                console.log("about to go back")
                                this.props.history.goBack()
                            } else {
                                this.openNotificationWithIcon('error', 'Please make sure all the images have been successfully uploaded')
                            }

                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one step is there')
                        }
                    }
                    }>

                        {/*FOR DIGITAL*/}

                        {this.props.match.params.type === "digital" && !this.props.location.state?.gettingStarted ?
                            <Form.Item name="simulationLink" label="Simulation Link" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            : null}



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

                                                    {this.props.location.state?.gettingStarted ?
                                                        <>
                                                            <Form.Item
                                                                label={`Simulation Link${index + 1}`}
                                                                {...field}
                                                                key={"sim-link" + index}
                                                                name={[field.name, 'simulationLink']}
                                                            >
                                                                <Input autosize={{ minRows: 1 }} />
                                                            </Form.Item>
                                                            <span style={{ textAlign: "center" }}>OR</span>
                                                            <Form.Item
                                                                {...field}
                                                                key={"upload_image" + index}
                                                                // {...formItemLayoutWithOutLabel}
                                                                name={[field.name, 'upload_image']}
                                                                valuePropName="fileList"
                                                                getValueFromEvent={normFile}
                                                                fieldKey={[field.fieldKey, 'upload_image']}
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
                                                                        await axios.post(`${baseUrl}/api/upload/experiment`, formData).then(res => {
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


                                                        </> : null}

                                                    {this.props.match.params.type === "arduino" ? <Form.Item
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
                                                                await axios.post(`${baseUrl}/api/upload/experiment`, formData).then(res => {
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
                                                    </Form.Item> : null}



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

                        {this.props.match.params.type === "digital" && !this.props.location.state?.gettingStarted ? <Form.Item initialValue="Hello this is default" label="Final message" name="finalMessage" rules={[{ required: true }]}>
                            <Input.TextArea autoSize={{ minRows: 2 }} />
                        </Form.Item> : null}

                        <Form.Item>
                            <Button loading={this.state.loading} type="primary" htmlType="submit">Add/Update</Button>
                        </Form.Item>
                        <p>***Update only if any changes are made, otherwise it may take time***</p>

                    </Form>
                </div>
            )
        } else if (!this.props.currentCourse.experiment) {
            console.log("SECOND FORM")
            return (
                <div style={{ margin: "3%", padding: "2% ", border: "2px solid black" }}>
                    <h2>{this.props.currentCourse.name.toUpperCase()} : Experiment</h2>

                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form onFinish={async (val) => {
                        console.log("valllll", val)
                        const { steps, simulationLink, finalMessage } = val;
                        let success = 1;
                        if (steps.length) {

                            let newSteps;

                            if (this.props.match.params.type === "arduino") {
                                newSteps = steps.map(step => {
                                    const { upload_image, description } = step;
                                    if (upload_image[0].response && upload_image[0].response.location) {
                                        return {
                                            description,
                                            upload_image: [{
                                                name: upload_image[0].name,
                                                response: upload_image[0].response,
                                                status: upload_image[0].status,
                                                thumbUrl: upload_image[0].thumbUrl,
                                                uid: upload_image[0].uid
                                            }],
                                            imagePath: upload_image[0].response.location
                                        }

                                    }
                                    else {
                                        success = 0;
                                    }
                                })
                            }
                            else if (this.props.location.state?.gettingStarted) {
                                newSteps = steps.map(step => {
                                    const { upload_image, description, simulationLink } = step;
                                    if (simulationLink) {
                                        return {
                                            description,
                                            simulationLink
                                        }
                                    }
                                    else if (upload_image && upload_image.length && upload_image[0].response && upload_image[0].response.location) {
                                        return {
                                            description,
                                            upload_image: [{
                                                name: upload_image[0].name,
                                                response: upload_image[0].response,
                                                status: upload_image[0].status,
                                                thumbUrl: upload_image[0].thumbUrl,
                                                uid: upload_image[0].uid,
                                            }],
                                            imagePath: upload_image[0].response.location
                                        }
                                    }
                                    else {
                                        success = 0
                                    }
                                })
                            }
                            else {
                                newSteps = steps;
                            }

                            if (success) {

                                this.setState({ loading: true })
                                await this.props.addExperiment(this.props.match.params.id, newSteps, simulationLink, finalMessage, this.props.currentCourse.experiment)
                                this.setState({ loading: false })
                                console.log("abt to cler")
                                this.props.clearExperiment()
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
                        {/*FOR DIGITAL*/}

                        {this.props.match.params.type === "digital" && !this.props.location.state?.gettingStarted ?
                            <Form.Item name="simulationLink" label="Simulation Link" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            : null}
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

                                                    {this.props.location.state?.gettingStarted ?
                                                        <>
                                                            <Form.Item
                                                                label={`Simulation Link${index + 1}`}
                                                                {...field}
                                                                key={"sim-link" + index}
                                                                name={[field.name, 'simulationLink']}
                                                            >
                                                                <Input autosize={{ minRows: 1 }} />
                                                            </Form.Item>
                                                            <span style={{ textAlign: "center" }}>OR</span>
                                                            <Form.Item
                                                                {...field}
                                                                key={"upload_image" + index}
                                                                // {...formItemLayoutWithOutLabel}
                                                                name={[field.name, 'upload_image']}
                                                                valuePropName="fileList"
                                                                getValueFromEvent={normFile}
                                                                fieldKey={[field.fieldKey, 'upload_image']}
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
                                                                        await axios.post(`${baseUrl}/api/upload/experiment`, formData).then(res => {
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


                                                        </> : null}




                                                    {this.props.match.params.type === "arduino" ? <Form.Item
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
                                                                await axios.post(`${baseUrl}/api/upload/experiment`, formData).then(res => {
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
                                                    </Form.Item> : null}

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

                        {this.props.match.params.type === "digital" && !this.props.location.state?.gettingStarted ? <Form.Item initialValue="Hello this is default" label="Final message" name="finalMessage" rules={[{ required: true }]}>
                            <Input.TextArea autoSize={{ minRows: 2 }} />
                        </Form.Item> : null}

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
    experiment: state.courseReducer.experiment
})

const mapDispatchToProps = dispatch => ({
    addExperiment: bindActionCreators(addExperiment, dispatch),
    clearExperiment: bindActionCreators(clearExperiment, dispatch),
    getExperiment: bindActionCreators(getExperiment, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddExperiment)