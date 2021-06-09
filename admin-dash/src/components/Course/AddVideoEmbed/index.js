import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getVideoEmbed, addVideoEmbed, clearVideoEmbed } from '../action';

import { Form, Input, Button, notification } from 'antd';

class AddVideoEmbed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentDidMount() {
        if (this.props.currentCourse.videoembed) {
            this.props.getVideoEmbed(this.props.currentCourse.videoembed);
        } else {
            console.log('Does not have any videoembed start from the first');
        }
    }

    componentWillUnmount() {
        this.props.clearVideoEmbed();
    }

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message,
        });
    };

    render() {
        if (this.props.currentCourse.videoembed && this.props.videoembed) {
            console.log('FIRST FORM, HAS EMBED', this.props);
            const urlEmbed = this.props.videoembed.url;
            const titleEmbed = this.props.videoembed.title;

            return (
                <div
                    style={{
                        margin: '3%',
                        padding: '2% ',
                        border: '2px solid black',
                    }}
                >
                    <h2>
                        {this.props.currentCourse.name.toUpperCase()} : Video
                        Embed
                    </h2>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form
                        initialValues={this.props.videoembed}
                        onFinish={async (val) => {
                            const { titleEmbed, urlEmbed } = val;
                            console.log('urlsett:', urlEmbed);
                            let success = 1;
                            if (urlEmbed !== '') {
                                this.setState({ loading: true });
                                await this.props.addVideoEmbed(
                                    this.props.match.params.id,
                                    titleEmbed,
                                    urlEmbed
                                    // this.props.currentCourse.videoembed
                                );
                                this.setState({ loading: false });
                                console.log('about to clear');
                                this.props.clearVideoEmbed();
                                console.log('about to go back');
                                this.props.history.goBack();
                            } else {
                                this.openNotificationWithIcon(
                                    'error',
                                    'Please make sure at least link is there'
                                );
                            }
                        }}
                    >
                        {/*FOR ARDUINO*/}
                        <Form.Item
                            // initialValue="If you want provide title"
                            initialValue={titleEmbed}
                            label="Title"
                            name="titleEmbed"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea autoSize={{ minRows: 2 }} />
                        </Form.Item>

                        <Form.Item
                            initialValue={urlEmbed}
                            name="urlEmbed"
                            label="Youtube URL"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        {/* <Form.List name="steps" label="steps" rules={[{ required: true }]}>
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
                        </Form.List> */}

                        <Form.Item>
                            <Button
                                loading={this.state.loading}
                                type="primary"
                                htmlType="submit"
                            >
                                Add/Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            );
        } else if (!this.props.currentCourse.videoembed) {
            console.log('SECOND FORM', this.props);
            return (
                <div
                    style={{
                        margin: '3%',
                        padding: '2% ',
                        border: '2px solid black',
                    }}
                >
                    <h2>
                        {this.props.currentCourse.name.toUpperCase()} : Video
                        Embed
                    </h2>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form
                        onFinish={async (val) => {
                            console.log('valllll', val);
                            const { titleEmbed, urlEmbed } = val;
                            if (urlEmbed !== '') {
                                this.setState({ loading: true });
                                await this.props.addVideoEmbed(
                                    this.props.match.params.id,
                                    titleEmbed,
                                    urlEmbed
                                    // this.props.currentCourse.videoembed
                                );
                                this.setState({ loading: false });
                                console.log('abt to clear');
                                this.props.clearVideoEmbed();
                                console.log('abt to go back');
                                this.props.history.goBack();
                            } else {
                                this.openNotificationWithIcon(
                                    'error',
                                    'Please make sure at least link is there'
                                );
                            }
                        }}
                    >
                        {/*FOR ARDUINO*/}
                        <Form.Item
                            label="Title"
                            name="titleEmbed"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea
                                autoSize={{ minRows: 2 }}
                                placeholder="Place some title or small description"
                            />
                        </Form.Item>
                        <Form.Item
                            name="urlEmbed"
                            label="Youtube URL"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Youtube video link" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                loading={this.state.loading}
                                type="primary"
                                htmlType="submit"
                            >
                                Add/Update
                            </Button>
                        </Form.Item>
                        <p>
                            ***Update only if any changes are made, otherwise it
                            may take time***
                        </p>
                    </Form>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => ({
    currentCourse: state.courseReducer.currentCourse,
    videoembed: state.courseReducer.videoembed,
});

const mapDispatchToProps = (dispatch) => ({
    addVideoEmbed: bindActionCreators(addVideoEmbed, dispatch),
    clearVideoEmbed: bindActionCreators(clearVideoEmbed, dispatch),
    getVideoEmbed: bindActionCreators(getVideoEmbed, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddVideoEmbed);
