import { Button, Card, Form, Input, message, Typography } from 'antd';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
	const [showForgotPassword, setShowForgotPassword] = useState(false);

  const onFinish = async (values: any) => {
		setLoading(true);
		const loginInfo = window.localStorage.getItem('loginInfo');
    if (loginInfo) {
      const formattedLoginInfo = JSON.parse(loginInfo);
      if (formattedLoginInfo.email === values.email && formattedLoginInfo.password === values.password) {
        history.push("/dashboard");
      } else {
        message.error('Credentials incorrect')
      }
    } else {
      message.error('User does not exist');
    }
	}

  const onFinishFailed = async (values: any) => {
		setLoading(false);
	}

  return (
    <>
      <Card>
      <Typography.Title>Login</Typography.Title>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout='horizontal'
          initialValues={{ switch: true, input: 'hello' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please enter an email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please enter a password!' }]}>
            <Input.Password type='password' />
          </Form.Item>
          <Form.Item style={{ float: 'right' }}>
            <Button loading={loading} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <Link to="/account/register">sign up</Link>
      </Card>

    </>
  )
}

export default Login;