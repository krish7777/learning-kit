import React, { Component } from 'react';
import { Form, Input, Button, Upload, notification } from "antd";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';
import axios from "axios"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFormData } from './action';
import imageCompression from 'browser-image-compression';
import { baseUrl } from '../../config';


const { Dragger } = Upload;


class BuildCircuitBuilder extends Component {
    constructor() {
        super();
        this.state = {
            ans: null,
        }
    }
    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message,
        });
    };

    render() {
        const options = {
            maxSizeMB: 1,
            // maxWidthOrHeight: 720,
            useWebWorker: true
        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
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
        return (
            <div style={{ width: "800px", margin: "auto", padding: "20px 0" }}>
                <Form onFinish={(val) => {
                    const { steps } = val;
                    let success = 1;
                    let newSteps = steps.map(step => {
                        const { upload_image, upload_side, description } = step;
                        if (upload_side && upload_image[0].response && upload_image[0].response.location && upload_side[0].response && upload_side[0].response.location)
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
                        axios.post(`${baseUrl}/api/course/buildCircuit`, { course_id: "5f1ef04ec0f8f301d4f0668f", steps: newSteps })
                            .then(res => console.log("hmm seems fine"))
                            .catch(err => console.log("error in adding"))
                    }
                    else {
                        this.openNotificationWithIcon('error', 'Please make sure all the images have been successfully uploaded')

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
                                                            await axios.post(`${baseUrl}/api/upload/experiment`, formData).then(res => {
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
                        <Button type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </Form>


                {
                    this.state.ans ?
                        <Form initialValues={this.state.ans} onFinish={(val) => {
                            // this.setState({ ans: val });
                            console.log(val)
                        }}>
                            <Form.List name="steps" label="steps" rules={[{ required: true }]}>
                                {(fields, { add, remove }) => {
                                    return (
                                        <div>
                                            {fields.map((field, index) => (
                                                < div key={field.key} style={{ display: 'flex', alignItems: "center", }} >
                                                    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                                        <Form.Item
                                                            label={`Step${index + 1}`}
                                                            {...field}
                                                            name={[field.name, 'description']}
                                                            fieldKey={[field.fieldKey, 'description']}
                                                            rules={[{ required: true, message: 'Missing Step Description' }]}
                                                        >
                                                            <Input.TextArea style={{ width: "90%" }} />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...field}
                                                            {...formItemLayoutWithOutLabel}
                                                            name={[field.name, 'upload_image']}
                                                            valuePropName="fileList"
                                                            getValueFromEvent={normFile}
                                                            fieldKey={[field.fieldKey, 'upload_image']}
                                                            rules={[{ required: true, message: 'Missing step image' }]}
                                                        >
                                                            <Upload multiple={false} accept=".png"
                                                                name="file" action={`${baseUrl}/api/uploadExperimentImages?expId=123`} listType="picture">
                                                                <Button>
                                                                    <UploadOutlined /> Upload Image
          </Button>
                                                            </Upload>
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...field}
                                                            {...formItemLayoutWithOutLabel}
                                                            name={[field.name, 'upload_side']}
                                                            valuePropName="fileList"
                                                            getValueFromEvent={normFile}
                                                            fieldKey={[field.fieldKey, 'upload_side']}
                                                        >
                                                            <Upload multiple={false} accept=".png"
                                                                name="file" action={`${baseUrl}/api/uploadExperimentImages?expId=123`} listType="picture">
                                                                <Button>
                                                                    <UploadOutlined /> Upload Side Image(if any)
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
                                <Button type="primary" htmlType="submit">Add</Button>
                            </Form.Item>
                        </Form> : null
                }




            </div>
        );
    }
}


const mapStateToProps = state => ({
    // formData: state.buildCircuitBuilderReducer.formData
})

const mapDispatchToProps = dispatch => ({
    setFormData: bindActionCreators(setFormData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BuildCircuitBuilder);
