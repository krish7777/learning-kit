import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextEditor from '../../TextEditor'
import { bindActionCreators } from 'redux'
import {Input, Form, Button, notification } from 'antd'
import { addExcercise, clearExcercise, getExcercise } from '../action'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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

    render() {
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 2 },
            },
        };

        console.log("in render")
        console.log(this.props.currentCourse)

        if (this.props.currentCourse.excercise && this.props.excercise) {
            console.log("FIRST FORM")

            return (
                <div style={{ width: "800px", margin: "auto", padding: "20px 0" }}>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form initialValues={this.props.excercise} onFinish={async (val) => {
                        console.log("valllll", val)
                        const { excercise_list } = val;
                        let success = 1;
                        if (excercise_list.length) {
                            // axios.post('http://localhost:3300/course/buildCircuit', { course_id: "5f1ef04ec0f8f301d4f0668f", excercise_list: newexcercise_list })
                            //     .then(res => console.log("hmm seems fine"))
                            //     .catch(err => console.log("error in adding"))
                            this.setState({ loading: true })
                            await this.props.addExcercise(this.props.match.params.id, excercise_list,this.props.currentCourse.excercise)
                            this.setState({ loading: false })
                            console.log("aboutt to cler")
                            this.props.clearExcercise()
                            console.log("about to go back")
                            this.props.history.goBack()
                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one step is there')
                        }
                    }}>
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
                                                        key={"desc" + index}
                                                        name={[field.name, 'hint']}
                                                        fieldKey={[field.fieldKey, 'hint']}
                                                        rules={[{ required: true, message: 'Missing Hint' }]}
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
        }else if (!this.props.currentCourse.excercise) {
            console.log("SECOND FORM")
            return (
                <div style={{ width: "800px", margin: "auto", padding: "20px 0" }}>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form onFinish={async (val) => {
                        console.log("valllll", val)
                        const { excercise_list } = val;
                        
                        if (excercise_list.length) {

                                this.setState({ loading: true })
                                await this.props.addExcercise(this.props.match.params.id, excercise_list ,this.props.currentCourse.excercise)
                                this.setState({ loading: false })
                                console.log("abt to cler")
                                this.props.clearExcercise()
                                console.log("abt to go back")
                                this.props.history.goBack()
                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one step is there')

                        }


                    }}>
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
                                                        key={"desc" + index}
                                                        name={[field.name, 'hint']}
                                                        fieldKey={[field.fieldKey, 'hint']}
                                                        rules={[{ required: true, message: 'Missing hint' }]}
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