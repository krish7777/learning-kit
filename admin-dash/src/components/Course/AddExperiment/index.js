import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addExperiment, clearExperiment, getExperiment } from '../action';

import { Form, Input, Button, notification } from "antd";
import { MinusCircleOutlined, PlusOutlined,  } from '@ant-design/icons';

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

        if (this.props.currentCourse.experiment && this.props.experiment) {
            console.log("FIRST FORM")

            return (
                <div style={{ width: "800px", margin: "auto", padding: "20px 0" }}>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form initialValues={this.props.experiment} onFinish={async (val) => {
                        console.log("valllll", val)
                        const { steps , simulationLink} = val;
                        let success = 1;
                        if (steps.length) {
                            // axios.post('http://localhost:3300/course/buildCircuit', { course_id: "5f1ef04ec0f8f301d4f0668f", steps: newSteps })
                            //     .then(res => console.log("hmm seems fine"))
                            //     .catch(err => console.log("error in adding"))
                            this.setState({ loading: true })
                            await this.props.addExperiment(this.props.match.params.id, steps,simulationLink, this.props.currentCourse.experiment)
                            this.setState({ loading: false })
                            console.log("aboutt to cler")
                            this.props.clearExperiment()
                            console.log("about to go back")
                            this.props.history.goBack()
                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one step is there')
                        }
                    }}>
                        <Form.Item name="simulationLink" label="Simulation Link" rules={[{required:true}]}>
                            <Input/>
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

                        <Form.Item>
                            <Button loading={this.state.loading} type="primary" htmlType="submit">Add/Update</Button>
                        </Form.Item>
                        <p>***Update only if any changes are made, otherwise it may take time***</p>

                    </Form>
                </div>
            )
        }else if (!this.props.currentCourse.experiment) {
            console.log("SECOND FORM")
            return (
                <div style={{ width: "800px", margin: "auto", padding: "20px 0" }}>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form onFinish={async (val) => {
                        console.log("valllll", val)
                        const { steps, simulationLink } = val;
                        
                        if (steps.length) {

                                this.setState({ loading: true })
                                await this.props.addExperiment(this.props.match.params.id, steps, simulationLink ,this.props.currentCourse.experiment)
                                this.setState({ loading: false })
                                console.log("abt to cler")
                                this.props.clearExperiment()
                                console.log("abt to go back")
                                this.props.history.goBack()
                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one step is there')

                        }


                    }}>
                        <Form.Item name="simulationLink" label="Simulation Link" rules={[{required:true}]}>
                            <Input/>
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