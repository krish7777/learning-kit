import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addSimulation, clearSimulation, getSimulation } from '../action';
import axios from "axios"
import imageCompression from 'browser-image-compression';

import { Form, Input, Button, notification, Upload } from "antd";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { baseUrl } from '../../../config';

class AddSimulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        if (this.props.currentCourse.simulation) {
            console.log("has simulation, gotta call server")
            this.props.getSimulation(this.props.currentCourse.simulation)
        } else {
            console.log("does not have any simulation start from the first")
        }
    }

    componentWillUnmount() {
        this.props.clearSimulation()
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

        if (this.props.currentCourse.simulation && this.props.simulation) {
            console.log("FIRST FORM")

            return (
                <div style={{ margin: "3%", padding: "2% ", border: "2px solid black" }}>
                    <h2>{this.props.currentCourse.name.toUpperCase()} : Simulation</h2>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form initialValues={this.props.simulation} onFinish={async (val) => {
                        console.log("valllll", val)
                        const { steps, simulationLink, finalMessage } = val;
                        let success = 1;
                        if (steps.length) {

                            this.setState({ loading: true })
                            await this.props.addSimulation(this.props.match.params.id, steps, simulationLink, finalMessage, this.props.currentCourse.simulation)
                            this.setState({ loading: false })
                            console.log("aboutt to cler")
                            this.props.clearSimulation()
                            console.log("about to go back")
                            this.props.history.goBack()
                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one step is there')
                        }
                    }
                    }>

                        {/*FOR DIGITAL*/}

                        <Form.Item name="simulationLink" label="Simulation Link" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>



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

                        <Form.Item initialValue="Simulation is Over . Now Let's proceed to Experiment" label="Final message" name="finalMessage" rules={[{ required: true }]}>
                            <Input.TextArea autoSize={{ minRows: 2 }} />
                        </Form.Item>

                        <Form.Item>
                            <Button loading={this.state.loading} type="primary" htmlType="submit">Add/Update</Button>
                        </Form.Item>

                    </Form>
                </div>
            )
        } else if (!this.props.currentCourse.simulation) {
            console.log("SECOND FORM")
            return (
                <div style={{ margin: "3%", padding: "2% ", border: "2px solid black" }}>
                    <h2>{this.props.currentCourse.name.toUpperCase()} : Simulation</h2>

                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form onFinish={async (val) => {
                        console.log("valllll", val)
                        const { steps, simulationLink, finalMessage } = val;
                        if (steps.length) {
                            this.setState({ loading: true })
                            await this.props.addSimulation(this.props.match.params.id, steps, simulationLink, finalMessage, this.props.currentCourse.simulation)
                            this.setState({ loading: false })
                            console.log("abt to cler")
                            this.props.clearSimulation()
                            console.log("abt to go back")
                            this.props.history.goBack()
                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one step is there')

                        }


                    }}>
                        {/*FOR DIGITAL*/}

                        <Form.Item name="simulationLink" label="Simulation Link" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
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

                        <Form.Item initialValue="Simulation is Over . Now Let's proceed to Experiment" label="Final message" name="finalMessage" rules={[{ required: true }]}>
                            <Input.TextArea autoSize={{ minRows: 2 }} />
                        </Form.Item>

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
    simulation: state.courseReducer.simulation
})

const mapDispatchToProps = dispatch => ({
    addSimulation: bindActionCreators(addSimulation, dispatch),
    clearSimulation: bindActionCreators(clearSimulation, dispatch),
    getSimulation: bindActionCreators(getSimulation, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddSimulation)