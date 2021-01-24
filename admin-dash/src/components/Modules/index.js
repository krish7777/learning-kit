import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCourseTroubleshoot, getCourseTroubleshoot, getModules } from './action'
import { bindActionCreators } from 'redux'
import { Link } from "react-router-dom"
import { MODULE, SUBMODULE, GETTINGSTARTED } from '../../config'
import './styles.scss'
import { Form, Input, Button, notification, Tabs, Col, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined, } from '@ant-design/icons';
import TextEditor from '../TextEditor/text'
const { TabPane } = Tabs;



class Modules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedWindow: 'modules-tab',
        };
    }

    componentDidMount = async () => {
        await this.props.getModules(this.props.match.params.type);
        await this.props.getCourseTroubleshoot(this.props.match.params.type);
        console.log('after fetch');
    };

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message,
        });
    };
    changeCurrentWindow = (selectedOptionWord) => {
        this.setState({
            ...this.state,
            selectedWindow: selectedOptionWord,
        });
    };
    render() {
        const { modules } = this.props;
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 2 },
            },
        };
        return (
            <div className="card-container">
                <Tabs type="card" centered>
                    <TabPane tab="Modules" key="1">
                        <Col justify="space-around" align="middle">
                            <Divider>All {this.props.match.params.type} {MODULE}s</Divider>
                            {modules.map(module => (
                                <>
                                    {module.name !== GETTINGSTARTED + "ignore" &&
                                        <Link to={`/admin/${this.props.match.params.type}/module/${module._id}`}>
                                            <div>{module.name}</div>
                                        </Link>
                                    }
                                </>
                            ))}
                            <br />
                            <Link to={`/admin/${this.props.match.params.type}/add-module`}><Button style={{ margin: "10px" }}>Add {MODULE}</Button></Link>
                            <br />
                            {!modules.some(el => el.name === GETTINGSTARTED) &&
                                <Link to={`/admin/${this.props.match.params.type}/add-starter`}><Button style={{ margin: "10px" }}>Add Geting Started {MODULE}</Button></Link>
                            }
                            {modules.some(el => el.name === GETTINGSTARTED) &&
                                <Link to={`/admin/${this.props.match.params.type}/add-course/${modules.find(el => el.name === GETTINGSTARTED)._id}`}><Button style={{ margin: "10px" }}>Add Getting Started {SUBMODULE}</Button></Link>
                            }
                        </Col>
                    </TabPane>
                    <TabPane tab="Course Troubleshoot" key="2">
                        <Col justify="space-around" align="middle">
                            <Divider>COURSE-LEVEL-TROUBLESHOOT</Divider>

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
                                                                // rules={[{ required: true, message: 'Missing Step Question' }]}
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

                                </Form>
                            </div>

                        </Col>
                    </TabPane>
                </Tabs>
            </div>
        )

        //     <div>
        //         <div>
        //             All {this.props.match.params.type} {MODULE}s
        //         </div>
        //         <div className="allmodules-container">
        //             <div className="allmodules-navbar">
        //                 <div className="allmodules-name">
        //                     {this.props.match.params.type.toUpperCase()}
        //                 </div>
        //                 <div className="navbar-horizontal">
        //                     <button
        //                         className="modules-tab"
        //                         onClick={() =>
        //                             this.changeCurrentWindow('modules-tab')
        //                         }
        //                     >
        //                         {MODULE.toUpperCase()}S
        //                     </button>
        //                     <button
        //                         className="faqs-tab"
        //                         onClick={() =>
        //                             this.changeCurrentWindow('faqs-tab')
        //                         }
        //                     >
        //                         FAQS
        //                     </button>
        //                 </div>
        //             </div>

        //             {this.state.selectedWindow === 'faqs-tab' ? (
        //                 <div
        //                     style={{
        //                         width: '800px',
        //                         margin: 'auto',
        //                         padding: '20px 0',
        //                     }}
        //                 >
        //                     <p>
        //                         <u>COURSE-LEVEL-TROUBLESHOOT</u>
        //                     </p>
        //                     ***Don't Reload before Saving! Changes may get lost
        //                     ***
        //                     {
        //                         this.props.troubleshoot ?
        //                             (
        //                                 <Form
        //                                     initialValues={this.props.troubleshoot}
        //                                     onFinish={async (val) => {
        //                                         console.log('valllll', val);
        //                                         const { faqs } = val;
        //                                         if (faqs.length) {
        //                                             this.setState({ loading: true });
        //                                             await this.props.addCourseTroubleshoot(
        //                                                 this.props.match.params.type,
        //                                                 faqs
        //                                             );
        //                                             this.setState({ loading: false });
        //                                         } else {
        //                                             this.openNotificationWithIcon(
        //                                                 'error',
        //                                                 'Please make sure at least one FAQ is there'
        //                                             );
        //                                         }
        //                                     }}
        //                                 >
        //                                     <Form.List
        //                                         name="faqs"
        //                                         label="faqs"
        //                                         rules={[{ required: true }]}
        //                                     >
        //                                         {(fields, { add, remove }) => {
        //                                             return (
        //                                                 <div>
        //                                                     {fields.map((field, index) => (
        //                                                         <div
        //                                                             key={'unique' + index}
        //                                                             style={{
        //                                                                 display: 'flex',
        //                                                                 alignItems:
        //                                                                     'center',
        //                                                             }}
        //                                                         >
        //                                                             <div
        //                                                                 style={{
        //                                                                     display: 'flex',
        //                                                                     flexDirection:
        //                                                                         'column',
        //                                                                     width: '100%',
        //                                                                 }}
        //                                                             >
        //                                                                 <Form.Item
        //                                                                     label={`Question${index + 1
        //                                                                         }`}
        //                                                                     {...field}
        //                                                                     key={
        //                                                                         'desc' +
        //                                                                         index
        //                                                                     }
        //                                                                     name={[
        //                                                                         field.name,
        //                                                                         'question',
        //                                                                     ]}
        //                                                                     fieldKey={[
        //                                                                         field.fieldKey,
        //                                                                         'question',
        //                                                                     ]}
        //                                                                     rules={[
        //                                                                         {
        //                                                                             required: true,
        //                                                                             message:
        //                                                                                 'Missing Step Question',
        //                                                                         },
        //                                                                     ]}
        //                                                                 >
        //                                                                     <Input.TextArea
        //                                                                         style={{
        //                                                                             width:
        //                                                                                 '90%',
        //                                                                         }}
        //                                                                         autoSize={{
        //                                                                             minRows: 2,
        //                                                                         }}
        //                                                                     />
        //                                                                 </Form.Item>
        //                                                                 <Form.Item
        //                                                                     label={`Answer${index + 1
        //                                                                         }`}
        //                                                                     {...field}
        //                                                                     key={
        //                                                                         'desc' +
        //                                                                         index
        //                                                                     }
        //                                                                     name={[
        //                                                                         field.name,
        //                                                                         'answer',
        //                                                                     ]}
        //                                                                     fieldKey={[
        //                                                                         field.fieldKey,
        //                                                                         'answer',
        //                                                                     ]}
        //                                                                 // rules={[{ required: true, message: 'Missing Step Answer' }]}
        //                                                                 >
        //                                                                     <TextEditor />
        //                                                                 </Form.Item>
        //                                                             </div>

        //                                                             <MinusCircleOutlined
        //                                                                 style={{
        //                                                                     color: 'red',
        //                                                                     fontSize:
        //                                                                         '20px',
        //                                                                 }}
        //                                                                 onClick={() => {
        //                                                                     remove(
        //                                                                         field.name
        //                                                                     );
        //                                                                 }}
        //                                                             />
        //                                                         </div>
        //                                                     ))}
        //                                                     <Form.Item
        //                                                         {...formItemLayoutWithOutLabel}
        //                                                     >
        //                                                         <Button
        //                                                             type="dashed"
        //                                                             onClick={() => {
        //                                                                 add();
        //                                                             }}
        //                                                             style={{
        //                                                                 width: '60%',
        //                                                                 alignSelf: 'center',
        //                                                             }}
        //                                                         >
        //                                                             <PlusOutlined /> Add
        //                                                         Question
        //                                                     </Button>
        //                                                     </Form.Item>
        //                                                 </div>
        //                                             );
        //                                         }}
        //                                     </Form.List>

        //                                     <Form.Item>
        //                                         <Button
        //                                             loading={this.state.loading}
        //                                             type="primary"
        //                                             htmlType="submit"
        //                                         >
        //                                             Save/Update
        //                                     </Button>
        //                                     </Form.Item>
        //                                     <p>
        //                                         ***Update only if any changes are made,
        //                                         otherwise it may take time***
        //                                 </p>
        //                                 </Form>
        //                             )
        //                             : null
        //                     }

        //                 </div>
        //             ) : (
        //                     <div
        //                         style={{
        //                             width: '800px',
        //                             margin: 'auto',
        //                             padding: '20px 0',
        //                             fontSize: '150%',
        //                         }}
        //                     >
        //                         {modules.map((module) => (
        //                             <>
        //                                 {module.name !==
        //                                     GETTINGSTARTED + 'ignore' && (
        //                                         <Link
        //                                             to={`/admin/${this.props.match.params.type}/module/${module._id}`}
        //                                         >
        //                                             <div>⁜ {module.name}</div>
        //                                         </Link>
        //                                     )}
        //                             </>
        //                         ))}
        //                         <br />
        //                         <Link
        //                             to={`/admin/${this.props.match.params.type}/add-module`}
        //                         >
        //                             <Button>Add {MODULE}</Button>
        //                         </Link>
        //                     </div>
        //                 )}
        //         </div>


        //         <br />
        //         {!modules.some((el) => el.name === GETTINGSTARTED) && (
        //             <Link to={`/admin/${this.props.match.params.type}/add-starter`}>
        //                 <Button>Add Starter {MODULE}</Button>
        //             </Link>
        //         )}
        //         {modules.some((el) => el.name === GETTINGSTARTED) && (
        //             <Link
        //                 to={`/admin/${this.props.match.params.type}/add-course/${modules.find((el) => el.name === GETTINGSTARTED)._id
        //                     }`}
        //             >
        //                 <Button>Add Starter {SUBMODULE}</Button>
        //             </Link>
        //         )}
        //     </div>
        // );
    }
}

const mapStateToProps = (state) => ({
    modules: state.modulesReducer.modules,
    troubleshoot: state.modulesReducer.courseTroubleshoot,
});

const mapDispatchToProps = (dispatch) => ({
    getModules: bindActionCreators(getModules, dispatch),
    getCourseTroubleshoot: bindActionCreators(getCourseTroubleshoot, dispatch),
    addCourseTroubleshoot: bindActionCreators(addCourseTroubleshoot, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modules);
