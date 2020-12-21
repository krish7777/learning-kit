import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCourseTroubleshoot, getCourseTroubleshoot, getModules } from './action'
import { bindActionCreators } from 'redux'
import { Link } from "react-router-dom"
import { MODULE,SUBMODULE,GETTINGSTARTED } from '../../config'

import { Form, Input, Button, notification } from "antd";
import { MinusCircleOutlined, PlusOutlined, } from '@ant-design/icons';
import TextEditor from '../TextEditor/text'

class Modules extends Component {
  constructor (props) {
    super (props);
    this.state = {
      loading: false,
    };
  }
    render() {
        const { modules } = this.props;
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 2 },
            },
        };
        return (
            <div>
                <div>All {this.props.match.params.type} {MODULE}s</div>
                {modules.map(module => (
                    <>
                    {module.name !== GETTINGSTARTED+"ignore" &&
                    <Link to={`/i/${this.props.match.params.type}/module/${module._id}`}>
                        <div>{module.name}</div>
                    </Link>
                    }
                    </>
                ))}
                <br />
                <Link to={`/i/${this.props.match.params.type}/add-module`}><Button>Add {MODULE}</Button></Link>
                <br/>
                {!modules.some(el => el.name === GETTINGSTARTED)&&
                <Link to={`/i/${this.props.match.params.type}/add-starter`}><Button>Add Starter {MODULE}</Button></Link>
                }
                {modules.some(el => el.name === GETTINGSTARTED)&&
                <Link to={`/i/${this.props.match.params.type}/add-course/${modules.find(el => el.name === GETTINGSTARTED)._id}`}><Button>Add Starter {SUBMODULE}</Button></Link>
                }
                <p>COURSE-LEVEL-TROUBLESHOOT</p>

                <div style={{ width: "800px", margin: "auto", padding: "20px 0" }}>
                    ***Don't Reload before Saving! Changes may get lost ***
                    <Form initialValues={this.props.troubleshoot} onFinish={async (val) => {
                        console.log("valllll", val)
                        const { faqs } = val;
                        if (faqs.length) {

                            this.setState({ loading: true })
                            await this.props.addCourseTroubleshoot(this.props.match.params.type, faqs)
                            this.setState({ loading: false })
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
                                                    // rules={[{ required: true, message: 'Missing Step Answer' }]}
                                                    >
                                                        <TextEditor />

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



            </div>
        )
    }
}

const mapStateToProps = state => ({
  modules: state.modulesReducer.modules,
  troubleshoot: state.modulesReducer.courseTroubleshoot,
});

const mapDispatchToProps = dispatch => ({
  getModules: bindActionCreators (getModules, dispatch),
  getCourseTroubleshoot: bindActionCreators (getCourseTroubleshoot, dispatch),
  addCourseTroubleshoot: bindActionCreators (addCourseTroubleshoot, dispatch),
});

export default connect (mapStateToProps, mapDispatchToProps) (Modules);
