import { Button, Card, Form, Input, Typography } from 'antd';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

const Register: React.FC = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [showForgotPassword, setShowForgotPassword] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);
		window.localStorage.setItem('loginInfo', JSON.stringify({email: values.email, password: values.password}));
		history.push("/dashboard");
	}

	const onFinishFailed = async (values: any) => {
		setLoading(false);
	}
	return (
		<>
			<Card>
				<Typography.Title>Register</Typography.Title>
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
				<Link to="/">Login</Link>
			</Card>

		</>
	)
}

export default Register;