import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentModule, updateModule, updateSubModule, deleteSubModule, clearCurrentModule } from '../action';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Divider, Row } from 'antd';
import { baseUrl, SUBMODULE } from '../../../config';
import './styles.scss';
import imageCompression from 'browser-image-compression';
import axios from 'axios';

import { Editor } from '@tinymce/tinymce-react';

class Module extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedWindow: 'submodule-name',
            name: '',
            introduction: '',
        };
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getCurrentModule(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearCurrentModule()
    }

    changeCurrentWindow = (selectedOptionWord) => {
        this.setState({
            ...this.state,
            selectedWindow: selectedOptionWord,
        });
    };
    handleEditorChange(e) {
        // console.log('Content was updated:', e.target.getContent());
        this.setState({ introduction: e.target.getContent() });
    }
    onFinish = async (event) => {
        // event.preventDefault();
        // console.log('You are submitting ' + JSON.stringify(this.props.module));
        await this.props.updateModule(
            event.name,
            this.state.introduction,
            this.props.match.params.id
        );
        this.props.history.goBack();
    };
    onSubFinish = async (values) => {
        await this.props.updateSubModule(values.name, values.id);
        // this.props.history.goBack()
    };
    onSubDel = async (event) => {
        await this.props.deleteSubModule(event);
        this.props.history.go(0);
    };
    render() {
        const { module } = this.props;
        if (module)
            return (
                <div className="module-container">
                    <div className="module-navbar">
                        <div className="module-name">
                            {module.name ? module.name.toUpperCase() : ''}
                        </div>
                        <div className="navbar-horizontal">


                            <button
                                className={this.state.selectedWindow === 'submodule-name' ? "submodule-name focus" : "submodule-name"}
                                onClick={() =>
                                    this.changeCurrentWindow('submodule-name')
                                }
                            >
                                {SUBMODULE.toUpperCase()}S
                            </button>
                            <button
                                className={this.state.selectedWindow === 'module-details' ? "module-details focus" : "module-details"}
                                onClick={() =>
                                    this.changeCurrentWindow('module-details')
                                }
                            >
                                MODULE DETAILS
                            </button>
                        </div>
                    </div>

                    {/* SHOW MODULE DETAILS / SUBMODULES*/}
                    {this.state.selectedWindow === 'module-details' ? (
                        <Form
                            className="module-form"
                            key={'uniq' + module.introduction}
                            name="update-form"
                            onFinish={this.onFinish}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ name: module.name }}
                        >
                            <Form.Item label="Name">
                                <Form.Item
                                    name="name"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: 'This field is required',
                                        },
                                    ]}
                                >
                                    <Input
                                        name="name"
                                        style={{ width: 160 }}
                                        placeholder={module.name}
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Description">
                                <Form.Item
                                    name="introduction"
                                    noStyle
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'This field is required',
                                //     },
                                // ]}
                                >
                                    {/* <Input
                                        name="introduction"
                                        style={{ width: 260, height: '7vw' }}
                                        placeholder={module.introduction}
                                    /> */}
                                    <Editor
                                        textareaName="introduction"
                                        apiKey="n7942578kkai07fww91ixztab3vfa874swodd4i2e1ymki4i"
                                        init={{
                                            height: '90vh',
                                            skin: 'oxide-dark',
                                            content_style:
                                                '.mce-content-body{background-color:#041D32; color:white}',
                                            menubar: false,
                                            image_dimensions: false,
                                            image_class_list: [
                                                {
                                                    title: 'Responsive',
                                                    value: 'img-responsive',
                                                },
                                            ],
                                            formats: {
                                                nomargin: {
                                                    selector: 'figure',
                                                    classes: 'no-margin',
                                                },
                                            },
                                            plugins: [
                                                'advlist autolink lists link image',
                                                'charmap print preview anchor help',
                                                'searchreplace visualblocks code',
                                                'insertdatetime media table paste wordcount emoticons',
                                            ],
                                            automatic_uploads: true,
                                            image_title: true,
                                            image_caption: true,
                                            file_picker_types: 'image',
                                            toolbar:
                                                'undo redo | formatselect | bold italic | \
                                alignleft aligncenter alignright | \
                                bullist numlist outdent indent  | image table  | fontselect fontsizeselect|link | forecolor backcolor  |  emoticons | preview',

                                            file_picker_callback: (
                                                callback,
                                                value,
                                                meta
                                            ) => {
                                                console.log('called');
                                                var input = document.createElement(
                                                    'input'
                                                );
                                                input.setAttribute(
                                                    'type',
                                                    'file'
                                                );
                                                input.setAttribute(
                                                    'accept',
                                                    'image/*'
                                                );
                                                console.log('this', this);
                                                input.onchange = async function () {
                                                    var file = this.files[0];
                                                    console.log(
                                                        'before compeee'
                                                    );
                                                    console.log(
                                                        'originalFile instanceof Blob',
                                                        file instanceof Blob
                                                    ); // true
                                                    console.log(
                                                        `originalFile size ${file.size /
                                                        1024 /
                                                        1024
                                                        } MB`
                                                    );
                                                    const options = {
                                                        maxSizeMB: 1,
                                                        maxWidthOrHeight: 920,
                                                        useWebWorker: true,
                                                    };
                                                    try {
                                                        const compressedFile = await imageCompression(
                                                            file,
                                                            options
                                                        );

                                                        console.log(
                                                            'compressedFile instanceof Blob',
                                                            compressedFile instanceof
                                                            Blob
                                                        ); // true
                                                        console.log(
                                                            `compressedFile size ${compressedFile.size /
                                                            1024 /
                                                            1024
                                                            } MB`
                                                        );
                                                        let formData = new FormData();
                                                        formData.set(
                                                            'expId',
                                                            '12345'
                                                        );
                                                        formData.append(
                                                            'file',
                                                            compressedFile
                                                        );

                                                        await axios
                                                            .post(
                                                                `${baseUrl}/api/upload/introduction`,
                                                                formData
                                                            )
                                                            .then((res) => {
                                                                console.log(
                                                                    'res.data',
                                                                    res.data
                                                                );
                                                                console.log(
                                                                    'path',
                                                                    process.env
                                                                        .PUBLIC_URL
                                                                );
                                                                callback(
                                                                    res.data
                                                                        .location,
                                                                    {
                                                                        alt:
                                                                            res
                                                                                .data
                                                                                .originalName,
                                                                    }
                                                                );
                                                            })
                                                            .catch((err) =>
                                                                console.log(
                                                                    'error in uploading image'
                                                                )
                                                            );
                                                    } catch (err) {
                                                        console.log(
                                                            'an erron man , probly while compressing'
                                                        );
                                                    }

                                                    // console.log('images', file)
                                                    // var reader = new FileReader();
                                                    // reader.onload = function (e) {
                                                    //   var id = 'blobid' + (new Date()).getTime();
                                                    //   console.log('name', e.target.result)
                                                    //   callback('logo192.png', {
                                                    //     alt: file.name
                                                    //   })
                                                    // }
                                                    // reader.readAsDataURL(file)
                                                };
                                                input.click();
                                            },
                                            paste_data_images: true,
                                        }}
                                        initialValue={module.introduction}
                                        onChange={this.handleEditorChange}
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ marginLeft: '50%' }}
                                >
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : (
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "20px" }}>
                                <ol className="submodule-list">
                                    {module.courses &&
                                        module.courses.map((course) => (
                                            <>
                                                <Divider />
                                                <Form
                                                    name="update-form"
                                                    layout={'inline'}
                                                    onFinish={this.onSubFinish}
                                                    initialValues={{
                                                        name: course.name,
                                                        id: course._id,
                                                    }}
                                                >
                                                    <Form.Item
                                                        name="name"
                                                        noStyle
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'This field is required',
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            name="name"
                                                            style={{ width: 160 }}
                                                            placeholder={
                                                                course.name
                                                            }
                                                        />
                                                    </Form.Item>
                                                    <Form.Item name="id" noStyle>
                                                        <Input
                                                            name="id"
                                                            style={{
                                                                display: 'none',
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                    >
                                                        Update Name
                                                </Button>
                                                    <Link
                                                        key={Math.random()}
                                                        to={`/admin/${this.props.match.params.type}/course/${course._id}`}
                                                    >
                                                        <Button type="dashed">
                                                            Edit SubModule
                                                    </Button>
                                                    </Link>
                                                    <Button type="dashed" onClick={()=>{this.onSubDel(course._id)}}>
                                                            Delete
                                                    </Button>
                                                </Form>
                                                {/* <Divider /> */}
                                            </>
                                        ))}
                                </ol>

                                <Link
                                    to={`/admin/${this.props.match.params.type}/add-course/${module._id}`}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ margin: '2%' }}
                                    >
                                        + Add SubModule
                                </Button>
                                </Link>
                            </div>
                        )}
                </div>
            );
        else return null;
    }
}

const mapStateToProps = (state) => ({
    module: state.modulesReducer.currentModule,
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentModule: bindActionCreators(getCurrentModule, dispatch),
    updateModule: bindActionCreators(updateModule, dispatch),
    updateSubModule: bindActionCreators(updateSubModule, dispatch),
    deleteSubModule: bindActionCreators(deleteSubModule, dispatch),
    clearCurrentModule: bindActionCreators(clearCurrentModule, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Module);
