import React from 'react'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeCurrentStep, getResultsAnalysis } from '../action'
import {
    Form,
    Input,
    Button,
    Checkbox,
    Radio,
    InputNumber,
    notification,
    Switch,
    Upload
} from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import "./styles.scss"


class ResultsAnalysis extends React.Component {

    componentDidMount() {
        this.props.getResultsAnalysis(this.props.id)
    }


    render() {

        const { changeCurrentStep, results } = this.props
        console.log("results", results)
        const normFile = e => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };
        return (
            <div className="form-builder">


                < div className="preview-form">

                    <Form layout="vertical" onFinish={(values) => { console.log(values) }}>

                        {
                            results?.formContent?.map(field => {
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
                                                <div style={{ whiteSpace: "pre-wrap", color: "white" }}>{name}</div>
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
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
</Button>
                        </Form.Item>
                    </Form>


                </div >
            </div>
        )
    }
}

const mapStateToProps = state => ({
    results: state.courseReducer.results
})

const mapDispatchToProps = dispatch => ({
    changeCurrentStep: bindActionCreators(changeCurrentStep, dispatch),
    getResultsAnalysis: bindActionCreators(getResultsAnalysis, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultsAnalysis)
