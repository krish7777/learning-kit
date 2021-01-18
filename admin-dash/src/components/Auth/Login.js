import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Row } from 'antd';
import './styles.scss';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loginAdmin } from './action';

const Login = (props) => {

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push("/admin")
        }
    }, [props])


    const [loading, setloading] = useState(false)

    const onFinish = async values => {
        console.log(values)
        setloading(true);
        await props.loginAdmin(values);
        setloading(false);
    };

    return (
        <div className="signup-form-container">
            <h1 style={{ textAlign: 'center', fontSize: 'xx-large' }}>
                LOGIN
            </h1>
            <Row type="flex" justify="center" align="middle" >
                <Form
                    // {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                    // {...tailLayout}
                    >
                        <Button loading={loading} type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Row>

        </div >
    );
};

const mapStateToProps = state => ({
    auth: state.authReducer
})

const mapDispatchToProps = dispatch => ({
    loginAdmin: bindActionCreators(loginAdmin, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
