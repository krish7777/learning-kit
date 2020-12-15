import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextEditor from '../../TextEditor'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import { uuid } from 'uuidv4'

import {
    Form,
    Input,
    Button,
    Checkbox,
    Radio,
    Modal,
    InputNumber,
    notification,
    Switch,
    Upload
} from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { addResults } from '../action'
import { baseUrl } from '../../../config'

class AddResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            inputModal: false,
            textareaModal: false,
            numberModal: false,
            checkboxModal: false,
            radioModal: false,
            switchModal: false,
            checkboxgroupModal: false,
            headingModal: false,
            textModal: false,
            tableModal: false,
            uploadModal: false,
            tempTable: [],
            tempValue: '',

            questions: []
        }
    }


    componentDidMount() {

        if (this.props.currentCourse.results) {
            console.log("has , gotta call server")
            // this.props.getExperimentForm(this.props.currentCourse.experiment)
            axios.get(`${baseUrl}/api/course/results/get/${this.props.currentCourse.results}`)
                .then(res => res.data)
                .then(results => {
                    if (results.results) {
                        this.setState({ questions: results.results.formContent })
                    }
                })
                .catch(err => console.log("error in getting results form"))
        } else {
            console.log("does not ahve any introduction astart from the first")
        }
    }



    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message,
        });
    };

    handleAddInput = ({ label, required }) => {
        this.setState(prevState => {
            return {
                ...prevState,
                questions: [...prevState.questions, { type: "input", required: required ? true : false, name: label, label: label }],
                inputModal: false
            }
        })
    }
    handleAddTextarea = ({ label, required }) => {
        this.setState(prevState => {
            return {
                ...prevState,
                questions: [...prevState.questions, { type: "textarea", required: required ? true : false, name: label, label: label }],
                textareaModal: false
            }
        })
    }
    handleAddNumber = ({ label, required }) => {
        this.setState(prevState => {
            return {
                ...prevState,
                questions: [...prevState.questions, { type: "number", required: required ? true : false, name: label, label: label }],
                numberModal: false
            }
        })
    }
    handleAddCheckbox = ({ label }) => {
        this.setState(prevState => {
            return {
                ...prevState,
                questions: [...prevState.questions, { type: "checkbox", name: label, label: label }],
                checkboxModal: false
            }
        })
    }
    handleAddText = ({ label }) => {
        console.log(label)
        this.setState(prevState => {
            return {
                ...prevState,
                questions: [...prevState.questions, { type: "text", name: label, label: label }],
                textModal: false
            }
        })
    }
    handleAddHeading = ({ label, type }) => {
        console.log(label)
        this.setState(prevState => {
            return {
                ...prevState,
                questions: [...prevState.questions, { type: "heading", name: label, label: type }],
                headingModal: false
            }
        })
    }
    handleAddSwitch = ({ label }) => {
        this.setState(prevState => {
            return {
                ...prevState,
                questions: [...prevState.questions, { type: "switch", name: label, label: label }],
                switchModal: false
            }
        })
    }
    handleAddCheckboxgroup = ({ label, required, values }) => {
        if (!values) {
            this.openNotificationWithIcon('error', 'You have to add atleast one option')
        }
        else
            this.setState(prevState => {
                return {
                    ...prevState,
                    questions: [...prevState.questions, { type: "checkboxgroup", name: label, required: required ? true : false, label: label, values: values }],
                    checkboxgroupModal: false
                }
            })
    }
    handleAddRadio = ({ label, required, values }) => {
        if (!values) {
            this.openNotificationWithIcon('error', 'You have to add atleast one option')
        }
        else
            this.setState(prevState => {
                return {
                    ...prevState,
                    questions: [...prevState.questions, { type: "radio", name: label, required: required ? true : false, label: label, values: values }],
                    radioModal: false
                }
            })
    }

    handelAddTruthTable = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                questions: [...prevState.questions, ...this.state.tempTable],
                tempTable: [],
                tableModal: false
            }
        })
    }

    handleAddUpload = ({ label, required }) => {
        this.setState(prevState => {
            return {
                ...prevState,
                questions: [...prevState.questions, { type: "upload", required: required, name: label, label: label }],
                uploadModal: false
            }
        })
    }


    submitForm = async () => {
        if (this.state.questions.length) {
            console.log(this.state.questions)
            this.setState({ loading: true })
            await this.props.addResults(this.props.match.params.id, this.state.questions, this.props.currentCourse.results)
            this.setState({ loading: false })
            this.props.history.goBack()
        }
    }






    render() {

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
                sm: { span: 20, offset: 4 },
            },
        };
        const normFile = e => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };



        return (
            <div className="form-builder">
                <div className="preview-form" >
                    <h2>Live Preview</h2>
                    <Form layout="vertical" onFinish={(values) => { console.log(values, this.state.questions) }}>

                        {
                            this.state.questions.map(field => {
                                const { type, name, label, required } = field;

                                switch (type) {
                                    case 'input': return (
                                        <Form.Item label={label} name={name} rules={[
                                            { required: required }
                                        ]}>
                                            <Input />
                                        </Form.Item>
                                    )
                                        break;
                                    case 'textarea': return (
                                        <Form.Item label={label} name={name} rules={[
                                            { required: required }
                                        ]}>
                                            <Input.TextArea autoSize={{ minRows: 3, maxRows: 100 }} />
                                        </Form.Item>
                                    )
                                        break;
                                    case 'number': return (
                                        <Form.Item label={label} name={name} rules={[
                                            { required: required }
                                        ]}>
                                            <InputNumber />
                                        </Form.Item>
                                    )
                                    case 'checkbox': return (
                                        <Form.Item name={name} valuePropName="checked" label={label} initialValue={false}>
                                            <Checkbox></Checkbox>
                                        </Form.Item>
                                    )
                                        break;
                                    case 'radio': return (
                                        <Form.Item label={label} name={name} rules={[
                                            { required: required }
                                        ]}>
                                            <Radio.Group>
                                                {field.values.map(rad =>
                                                    <Radio value={rad}>{rad}</Radio>)}
                                            </Radio.Group>

                                        </Form.Item>
                                    )
                                        break;
                                    case 'switch': return (
                                        <Form.Item name="switch" label="Switch" valuePropName="checked">
                                            <Switch checkedChildren="1" unCheckedChildren="0" />
                                        </Form.Item>
                                    )
                                        break;
                                    case 'text': {
                                        console.log(label)
                                        return (
                                            <Form.Item >
                                                <div style={{ whiteSpace: "pre-wrap" }}>{name}</div>
                                            </Form.Item>
                                        )
                                    }
                                        break;
                                    case 'heading': {
                                        return (
                                            <Form.Item >
                                                {label === 'h1' ? <h1>{name}</h1> : label === 'h2' ? <h2>{name}</h2> : label === 'h3' ? <h3>{name}</h3> : label === 'h4' ? <h4>{name}</h4> : label === 'h5' ? <h5>{name}</h5> : <h6>{name}</h6>}
                                                {/* <div style={{ whiteSpace: "pre-wrap" }}>{name}</div> */}
                                            </Form.Item>
                                        )
                                    }
                                        break;
                                    case 'checkboxgroup': {
                                        return (
                                            <Form.Item label={label} name={name} rules={[
                                                { required: required }
                                            ]}>
                                                <Checkbox.Group>
                                                    {field.values.map(check =>
                                                        <Checkbox value={check}>{check}</Checkbox>)}
                                                </Checkbox.Group>
                                            </Form.Item>
                                        )
                                    }
                                        break;
                                    case 'row': {
                                        return (
                                            <div className="truth-table-row">
                                                {field.values.map(value => {
                                                    if (value.startsWith('_switch_')) {
                                                        return (
                                                            <Form.Item className="switch" name={value} valuePropName="checked" initialValue={false}>
                                                                <Switch checkedChildren="1" unCheckedChildren="0" />
                                                            </Form.Item>

                                                        )
                                                        {/* <Form.Item>
                                                                <InputNumber defaultValue={value} disabled style={{ color: "black", textAlign: "center" }} />
                                                            </Form.Item> */}
                                                    }
                                                    else {
                                                        return (
                                                            <Form.Item >
                                                                <InputNumber defaultValue={value} disabled style={{ color: "black", textAlign: "center" }} />
                                                            </Form.Item>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        )
                                    }
                                        break;

                                    case 'upload': {
                                        return (
                                            <Form.Item name={name} label={label} valuePropName="fileList" getValueFromEvent={normFile} rules={[
                                                { required: required }]}>
                                                <Upload>
                                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                                </Upload>
                                            </Form.Item>
                                        )
                                    }
                                    default: return null
                                }
                            })
                        }
                        {/* <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                </Button>
                        </Form.Item> */}
                    </Form>
                </div>
                <div className="form-tools">
                    <Button type="primary" onClick={this.submitForm}>Save Form</Button>
                    <Button danger onClick={() => this.setState({ questions: [] })}>Delete Form</Button>
                    <Button onClick={() => this.setState({ inputModal: true })}>Input</Button>
                    <Button onClick={() => this.setState({ textareaModal: true })}>Text Area</Button>
                    <Button onClick={() => this.setState({ numberModal: true })}>Input Number</Button>
                    <Button onClick={() => this.setState({ checkboxModal: true })}>Checkbox</Button>
                    <Button onClick={() => this.setState({ checkboxgroupModal: true })}>Checkbox Group</Button>
                    <Button onClick={() => this.setState({ radioModal: true })}>Radio</Button>
                    <Button onClick={() => this.setState({ switchModal: true })}>Switch</Button>
                    <Button onClick={() => this.setState({ textModal: true })}>Text</Button>
                    <Button onClick={() => this.setState({ headingModal: true })}>Heading</Button>
                    <Button onClick={() => this.setState({ tableModal: true })}>Table</Button>
                    <Button onClick={() => this.setState({ uploadModal: true })}>Upload</Button>



                </div>
                <Modal
                    visible={this.state.inputModal}
                    title="Input"
                    onCancel={() => this.setState({ inputModal: false })}
                    footer={[]}
                    destroyOnClose
                >
                    <Form onFinish={this.handleAddInput}>
                        <Form.Item
                            label="Label"
                            name="label"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item name="required" valuePropName="checked">
                            <Checkbox>Required</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.textareaModal}
                    title="Text Area"
                    onCancel={() => this.setState({ textareaModal: false })}
                    footer={[]}
                    destroyOnClose
                >
                    <Form onFinish={this.handleAddTextarea}>
                        <Form.Item
                            label="Label"
                            name="label"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item name="required" valuePropName="checked">
                            <Checkbox>Required</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.numberModal}
                    title="Number"
                    onCancel={() => this.setState({ numberModal: false })}
                    footer={[]}
                    destroyOnClose
                >
                    <Form onFinish={this.handleAddNumber}>
                        <Form.Item
                            label="Label"
                            name="label"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item name="required" valuePropName="checked">
                            <Checkbox>Required</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.checkboxModal}
                    title="Check Box"
                    onCancel={() => this.setState({ checkboxModal: false })}
                    footer={[]}
                    destroyOnClose
                >
                    <Form onFinish={this.handleAddCheckbox}>
                        <Form.Item
                            label="Label"
                            name="label"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.switchModal}
                    title="Switch"
                    onCancel={() => this.setState({ switchModal: false })}
                    footer={[]}
                    destroyOnClose
                >
                    <Form onFinish={this.handleAddSwitch}>
                        <Form.Item
                            label="Label"
                            name="label"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.textModal}
                    title="Text"
                    onCancel={() => this.setState({ textModal: false })}
                    footer={[]}
                    destroyOnClose
                >
                    <Form onFinish={this.handleAddText}>
                        <Form.Item
                            label="Label"
                            name="label"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea autoSize />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.headingModal}
                    title="Heading"
                    onCancel={() => this.setState({ headingModal: false })}
                    footer={[]}
                    destroyOnClose
                >
                    <Form onFinish={this.handleAddHeading}>
                        <Form.Item
                            label="Label"
                            name="label"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <p>*The greater the number , smaller the heading</p>
                        <Form.Item
                            label="Heading type"
                            name="type"
                            rules={[{ required: true }]}>
                            <Radio.Group>
                                <Radio value={'h1'}>h1</Radio>
                                <Radio value={'h2'}>h2</Radio>
                                <Radio value={'h3'}>h3</Radio>
                                <Radio value={'h4'}>h4</Radio>
                                <Radio value={'h5'}>h5</Radio>
                                <Radio value={'h6'}>h6</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.checkboxgroupModal}
                    title="CheckBox Group"
                    onCancel={() => this.setState({ checkboxgroupModal: false })}
                    footer={[]}
                    destroyOnClose
                >
                    <Form onFinish={this.handleAddCheckboxgroup}>
                        <Form.Item
                            label="Label"
                            name="label"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.List name="values">
                            {(fields, { add, remove }) => {
                                return (
                                    <div>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                label={index === 0 ? 'Options' : ''}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Please fill the option or delete this field.",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input placeholder="option" style={{ width: '60%' }} />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        style={{ margin: '0 8px' }}
                                                        onClick={() => {
                                                            remove(field.name);
                                                        }}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        ))}
                                        <Form.Item {...formItemLayoutWithOutLabel}>
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add();
                                                }}
                                                style={{ width: '60%', alignSelf: "center" }}
                                            >
                                                <PlusOutlined /> Add options
                </Button>
                                        </Form.Item>
                                    </div>
                                );
                            }}
                        </Form.List>
                        <Form.Item name="required" valuePropName="checked">
                            <Checkbox>Required</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.radioModal}
                    title="Radio"
                    onCancel={() => this.setState({ radioModal: false })}
                    footer={[]}
                    destroyOnClose
                >
                    <Form onFinish={this.handleAddRadio}>
                        <Form.Item
                            label="Label"
                            name="label"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.List name="values">
                            {(fields, { add, remove }) => {
                                return (
                                    <div>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                label={index === 0 ? 'Options' : ''}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Please fill the option or delete this field.",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input placeholder="option" style={{ width: '60%' }} />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        style={{ margin: '0 8px' }}
                                                        onClick={() => {
                                                            remove(field.name);
                                                        }}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        ))}
                                        <Form.Item {...formItemLayoutWithOutLabel}>
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add();
                                                }}
                                                style={{ width: '60%', alignSelf: "center" }}
                                            >
                                                <PlusOutlined /> Add options
                </Button>
                                        </Form.Item>
                                    </div>
                                );
                            }}
                        </Form.List>
                        <Form.Item name="required" valuePropName="checked">
                            <Checkbox>Required</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.tableModal}
                    title="Table"
                    onCancel={() => this.setState({ tableModal: false, tempValue: '', tempTable: [] })}
                    footer={[]}
                    destroyOnClose
                >
                    <Form onFinish={this.handelAddTruthTable}>

                        <Button onClick={() => this.setState({ headingModal: true })}>Add Heading?</Button>
                        <Form.Item
                            label="Value"
                        >
                            <Input value={this.state.tempValue} onChange={(e) => { this.setState({ tempValue: e.target.value }) }} style={{ width: "150px" }} />
                        </Form.Item>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Button onClick={() => {
                                let { tempTable, tempValue } = this.state
                                if (tempValue) {
                                    if (tempTable.length) {
                                        tempTable[tempTable.length - 1].values.push(tempValue)
                                    }
                                    else {
                                        tempTable.push({
                                            type: "row",
                                            values: [tempValue]
                                        })
                                    }
                                    this.setState(
                                        {
                                            tempTable,
                                            tempValue: ''
                                        }
                                    )
                                }
                                else
                                    this.openNotificationWithIcon('warning', 'Please enter the default value')
                            }}>Add Box</Button>
                            <Button onClick={() => {
                                let { tempTable, tempValue } = this.state
                                if (tempValue) {
                                    tempTable.push({
                                        type: "row",
                                        values: [tempValue]
                                    })
                                    this.setState(
                                        {
                                            tempTable,
                                            tempValue: ""
                                        }
                                    )
                                }
                                else
                                    this.openNotificationWithIcon('warning', 'Please enter the defult value')
                            }}>Add Box in next row</Button>
                            <Button onClick={() => {
                                let { tempTable } = this.state
                                if (tempTable.length) {
                                    tempTable[tempTable.length - 1].values.push("_switch_" + uuid())
                                }
                                else {
                                    tempTable.push({
                                        type: "row",
                                        values: ["_switch_" + uuid()]
                                    })
                                }
                                this.setState(
                                    {
                                        tempTable
                                    }
                                )
                            }}>Add user switch</Button>
                        </div>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Confirm</Button>
                        </Form.Item>
                        <h3>Table Preview</h3>
                        <Form>{this.state.tempTable.map(row => (
                            <div className="truth-table-row">
                                {row.values.map(value => {
                                    if (value.startsWith('_switch_')) {
                                        return (
                                            <Form.Item className="switch" name={value} valuePropName="checked" initialValue={false}>
                                                <Switch checkedChildren="1" unCheckedChildren="0" />
                                            </Form.Item>
                                        )
                                    }
                                    else {
                                        return (
                                            <Form.Item >
                                                <InputNumber defaultValue={value} disabled style={{ color: "black", textAlign: "center" }} />
                                            </Form.Item>
                                        )
                                    }
                                })}
                            </div>
                        ))}</Form>
                    </Form>
                </Modal>

                <Modal
                    visible={this.state.uploadModal}
                    title="Upload"
                    onCancel={() => this.setState({ uploadModal: false })}
                    footer={[]}
                    destroyOnClose
                >
                    <Form onFinish={this.handleAddUpload}>
                        <Form.Item
                            label="Label"
                            name="label"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item name="required" valuePropName="checked">
                            <Checkbox>Required</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div >

        )
    }
}

const mapStateToProps = state => ({
    currentCourse: state.courseReducer.currentCourse,
})

const mapDispatchToProps = dispatch => ({
    addResults: bindActionCreators(addResults, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddResults)