import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCourseName, setCourseThumbnail, clearAddCourse, addCourse } from './action';
import { Form, Input, Button, Upload } from 'antd';
import imageCompression from 'browser-image-compression';
import axios from 'axios'
import { UploadOutlined } from '@ant-design/icons';
import { baseUrl } from '../../../config';


class AddCourse extends Component {

    state = {
        loading: false
    }

    componentDidMount() {
        console.log("module id : ", this.props.match.params.module_id)
    }

    handleSubmit = async (val) => {
        this.setState({
            loading: true
        })
        await this.props.addCourse(val)
        this.setState({ loading: false })
        // this.props.history.push(`/module/${this.props.match.params.module_id}`)
        this.props.history.goBack()
    }


    render() {
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
        const { name, thumbnailPath, setCourseName, setCourseThumbnail } = this.props;
        return (
            <div className="add-module" style={{ "display": "flex", "flexDirection": "column", justifyContent: "center" }}>
                <Form onFinish={(val) => {
                    const { name, thumbnailArray } = val;
                    let thumbnail = thumbnailArray[0];
                    if (thumbnail.response && thumbnail.response.location) {
                        thumbnail = { name: thumbnail.name, response: thumbnail.response, status: thumbnail.status, thumbUrl: thumbnail.thumbUrl, uid: thumbnail.uid }
                    }
                    this.handleSubmit({
                        name,
                        thumbnailPath: thumbnail.response.location,
                        thumbnailImage: thumbnail,
                        module_id: this.props.match.params.module_id
                    })
                }}>
                    <Form.Item label="Name" name="name" rules={[{ required: true }]} >
                        <Input value={name} onChange={(e) => setCourseName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        valuePropName="fileList"
                        name="thumbnailArray"
                        getValueFromEvent={normFile}
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
                    <Form.Item>
                        <Button loading={this.state.loading} type="primary" htmlType="submit">ADD SUB-MODULE</Button >
                    </Form.Item>
                </Form>


            </div >
        );
    }
}

const mapStateToProps = state => ({
    name: state.addCourseReducer.name,
    thumbnailPath: state.addCourseReducer.thumbnailPath
})

const mapDispatchToProps = dispatch => ({
    setCourseName: bindActionCreators(setCourseName, dispatch),
    setCourseThumbnail: bindActionCreators(setCourseThumbnail, dispatch),
    clearAddCourse: bindActionCreators(clearAddCourse, dispatch),
    addCourse: bindActionCreators(addCourse, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse)