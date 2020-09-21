// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { addTroubleshoot, clearTroubleshoot, getTroubleshoot } from '../action'

// import { Form, Input, Button, notification } from "antd";
// import { MinusCircleOutlined, PlusOutlined,  } from '@ant-design/icons';
// import TextEditor from '../../TextEditor';

// class AddTroubleshoot extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false,
//             faqs: []
//         }
//     }

//     componentDidMount() {
//         if (this.props.currentCourse.troubleshoot) {
//             console.log("has troubleshoot, gotta call server")
//             this.props.getTroubleshoot(this.props.currentCourse.troubleshoot)
//         } else {
//             console.log("does not have any troubleshoot start from the first")
//         }
//     }

//     openNotificationWithIcon = (type, message) => {
//         notification[type]({
//             message: message,
//         });
//     };
//     render() {
//         const formItemLayoutWithOutLabel = {
//             wrapperCol: {
//                 xs: { span: 24, offset: 0 },
//                 sm: { span: 20, offset: 2 },
//             },
//         };
        
//         return(
//             <div>
//                 TROUBLESHOOT
//             </div>
//         )

//     }
// }

// const mapStateToProps = state => ({
//     currentCourse: state.courseReducer.currentCourse,
//     troubleshoot: state.courseReducer.troubleshoot
// })

// const mapDispatchToProps = dispatch => ({
//     addTroubleshoot: bindActionCreators(addTroubleshoot, dispatch),
//     clearTroubleshoot: bindActionCreators(clearTroubleshoot, dispatch),
//     getTroubleshoot: bindActionCreators(getTroubleshoot, dispatch)
// })

// export default connect(mapStateToProps, mapDispatchToProps)(AddTroubleshoot)






































import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addTroubleshoot, clearTroubleshoot, getTroubleshoot } from '../action'

import { Form, Input, Button, notification } from "antd";
import { MinusCircleOutlined, PlusOutlined,  } from '@ant-design/icons';
import TextEditor from '../../TextEditor/text';

class AddTroubleshoot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        if (this.props.currentCourse.troubleshoot) {
            console.log("has troubleshoot, gotta call server")
            this.props.getTroubleshoot(this.props.currentCourse.troubleshoot)
        } else {
            console.log("does not have any troubleshoot start from the first")
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
        if (this.props.currentCourse.troubleshoot && this.props.troubleshoot) {
            console.log("FIRST FORM")

            console.log("vasss", this.props.troubleshoot)

            return (
                <div style={{ width: "800px", margin: "auto", padding: "20px 0" }}>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form initialValues={this.props.troubleshoot} onFinish={async (val) => {
                        console.log("valllll", val)
                        const { faqs } = val;
                        if (faqs.length) {

                            this.setState({ loading: true })
                            await this.props.addTroubleshoot(this.props.match.params.id, faqs, this.props.currentCourse.troubleshoot)
                            this.setState({ loading: false })
                            console.log("aboutt to clear")
                            this.props.clearTroubleshoot()
                            console.log("about to go back")
                            this.props.history.goBack()
                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one FAQ is there')
                        }

                    }}>

                        <Form.List name="faqs" label="faqs" rules={[{ required: true }]}>
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
                                                        rules={[{ required: true, message: 'Missing Step Question' }]}
                                                    >
                                                        <Input.TextArea style={{ width: "90%" }} autoSize={{ minRows: 2 }} />
                                                    </Form.Item>
                                                    <Form.Item 
                                                        label={`Answer${index + 1}`}
                                                        {...field}
                                                        key={"desc" + index}
                                                        name={[field.name, 'answer']}
                                                        fieldKey={[field.fieldKey, 'answer']}
                                                        rules={[{ required: true, message: 'Missing Step Answer' }]}
                                                    >
                                                     <TextEditor/>
                                                    
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
        }else if (!this.props.currentCourse.troubleshoot) {
            console.log("SECOND FORM")
            return (
                <div style={{ width: "800px", margin: "auto", padding: "20px 0" }}>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form onFinish={async (val) => {
                        console.log("valllll", val)
                        const { faqs} = val;
                        
                        if (faqs.length) {
                                this.setState({ loading: true })
                                await this.props.addTroubleshoot(this.props.match.params.id, faqs, this.props.currentCourse.troubleshoot)
                                this.setState({ loading: false })
                                console.log("abt to cler")
                                this.props.clearTroubleshoot()
                                console.log("abt to go back")
                                this.props.history.goBack()
                        } else {
                            this.openNotificationWithIcon('error', 'Please make sure at least one step is there')
                        }


                    }}>
                        
                        <Form.List name="faqs" label="faqs" rules={[{ required: true }]}>
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
                                                        rules={[{ required: true, message: 'Missing Step Question' }]}
                                                    >
                                                        <Input.TextArea style={{ width: "90%" }} autoSize={{ minRows: 2 }} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label={`Answer${index + 1}`}
                                                        {...field}
                                                        key={"desc" + index}
                                                        name={[field.name, 'answer']}
                                                        fieldKey={[field.fieldKey, 'answer']}
                                                        >
                                                        <TextEditor/>
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
            console.log("ddd")
            return null;
        }   



    }
}

const mapStateToProps = state => ({
    currentCourse: state.courseReducer.currentCourse,
    troubleshoot: state.courseReducer.troubleshoot
})

const mapDispatchToProps = dispatch => ({
    addTroubleshoot: bindActionCreators(addTroubleshoot, dispatch),
    clearTroubleshoot: bindActionCreators(clearTroubleshoot, dispatch),
    getTroubleshoot: bindActionCreators(getTroubleshoot, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTroubleshoot)
