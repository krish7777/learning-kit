import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentModule,updateModuleName } from '../action';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { SUBMODULE } from '../../../config';

class Module extends Component {
    // constructor() {
    //     super();
    //       this.state = {
    //         name: ''
    //       }
    // }
    // _handleChange = (value) => {
    //     this.setState({name: value})
    // };

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getCurrentModule(this.props.match.params.id)
    }

    onFinish = async (values) =>{
        await this.props.updateModuleName(values.name,this.props.match.params.id)
        this.props.history.goBack()
    } 

    render() {
        const { module } = this.props;
        if (module)
            return (
                <div>
                    {/* initialValues={{"name":module.name}} doesnt update on every reload :/ */}
                    <Form name="update-form"
                    onFinish={this.onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Form.Item label="Name">
                        <Form.Item
                        name="name"
                        noStyle
                        rules={[{ required: true, message: 'This field is required' }]}
                        >
                        <Input name="name" style={{ width: 160 }} placeholder={module.name}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                        Update
                        </Button>
                    </Form.Item>
                    </Form>
                    <div>{SUBMODULE.toUpperCase()}S</div>
                    <div>
                        {module.courses && module.courses.map((course,index) =>
                            <Link key={"unique" + index} to={`/i/${this.props.match.params.type}/course/${course._id}`}>
                                <div>{course.name}</div>
                            </Link>
                        )}
                    </div>
                    <Link to={`/i/${this.props.match.params.type}/add-course/${module._id}`}><Button>Add {SUBMODULE}</Button></Link>
                </div>
            )
        else
            return null;
    }
}

const mapStateToProps = state => ({
    module: state.modulesReducer.currentModule
})

const mapDispatchToProps = dispatch => ({
    getCurrentModule: bindActionCreators(getCurrentModule, dispatch),
    updateModuleName: bindActionCreators(updateModuleName, dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(Module);