import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentModule, updateModule } from '../action';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { SUBMODULE } from '../../../config';
import './styles.scss';

class Module extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedWindow: 'module-details',
            name: '',
            introduction: '',
        };
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getCurrentModule(this.props.match.params.id);
    }


    changeCurrentWindow = (selectedOptionWord) => {
        // console.log(
        //     'NOW SHOWING:' + this.state.selectedWindow
        // );
        this.setState({
            ...this.state,
            selectedWindow: selectedOptionWord,
        });
    };

    onFinish = async (event) => {
        // event.preventDefault();
        console.log('You are submitting ' + JSON.stringify(this.props.module));

        await this.props.updateModule(event.name, this.props.match.params.id);
        this.props.history.goBack();
    };

    render() {
        const { module } = this.props;
        if (module)
            return (
                <div className="module-container">
                    <div className="module-navbar">
                        <div className="module-name">
                            {module.name.toUpperCase()}
                        </div>
                        <div className="navbar-horizontal">
                            <button
                                className="module-details"
                                onClick={() =>
                                    this.changeCurrentWindow('module-details')
                                }
                            >
                                MODULE DETAILS
                            </button>

                            <button
                                className="submodule-name"
                                onClick={() =>
                                    this.changeCurrentWindow('submodule-name')
                                }
                            >
                                {SUBMODULE.toUpperCase()}S
                            </button>
                        </div>
                    </div>

                    {/* SHOW MODULE DETAILS / SUBMODULES*/}
                    {this.state.selectedWindow === 'module-details' ? (
                        <Form
                            name="update-form"
                            onFinish={this.onFinish}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Form.Item label="Name">
                                <Form.Item
                                    name="name"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: 'This field is required',
                                        },
                                    ]}
                                >
                                    <Input
                                        name="name"
                                        style={{ width: 160 }}
                                        placeholder={module.name}
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Introduction">
                                <Form.Item
                                    name="introduction"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: 'This field is required',
                                        },
                                    ]}
                                >
                                    <Input
                                        name="introduction"
                                        style={{ width: 260, height: '7vw' }}
                                        placeholder={module.introduction}
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ marginLeft: '60%' }}
                                >
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <div>
                            <ol className="submodule-list">
                                {module.courses &&
                                    module.courses.map((course) => (
                                        <Link
                                            key={Math.random()}
                                            to={`/i/${this.props.match.params.type}/course/${course._id}`}
                                        >
                                            <li className="submodule-listItem">
                                                {course.name}
                                            </li>
                                        </Link>
                                    ))}
                            </ol>

                            <Link
                                to={`/i/${this.props.match.params.type}/add-course/${module._id}`}
                            >
                                <Button className="add-button">
                                    + Add {SUBMODULE}
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            );
        else return null;
    }
}

const mapStateToProps = (state) => ({
    module: state.modulesReducer.currentModule,
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentModule: bindActionCreators(getCurrentModule, dispatch),
    updateModule: bindActionCreators(updateModule, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Module);
