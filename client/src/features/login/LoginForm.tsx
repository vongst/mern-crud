import React, { useState } from 'react';
import { Button, Col, Form, Row, FloatingLabel, Stack, Card, Alert, Spinner } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { loginAsync } from './loginSlice';
import { BsPersonX } from 'react-icons/bs'

const LoginForm = () => {

	const loginStatus = useAppSelector(state => state.login.status)
	const dispatch = useAppDispatch();

	const [ adminUserName, setAdminUserName ] = useState('admin@example.com')
	const [ adminPassword, setAdminPassword ] = useState('password')

	const handleSubmit = (event: any) => {
		event.preventDefault();
		dispatch(loginAsync({
			username: adminUserName,
			password: adminPassword,
	}))
}
	return (
		<Row className='mt-5'>
			<Col xs={12} md={{ span: 6, offset: 3 }}>
			<Form onSubmit={handleSubmit}>
			<Card className='p-5'>
				
				<h2 className="mb-5">Login</h2>

				{loginStatus == 'failed' ? 
				<Alert key="danger" variant="danger"><BsPersonX /> Authentication failed.</Alert> 
				:''}

				<Stack gap={3}>

					<FloatingLabel label="Username">
						<Form.Control size="lg" type="text" value={adminUserName} onChange={(e) => setAdminUserName(e.target.value)} />
					</FloatingLabel>

					<FloatingLabel label="Password">
						<Form.Control size="lg" type="text" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}/>
					</FloatingLabel>

				{ loginStatus == 'loading' ? 
					<Button variant="primary" size="lg" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Authenticating street cred...</Button> 
				: <Button variant="primary" size="lg" type="submit">Login</Button> }

				</Stack>
			</Card>
			</Form>
			</Col>

			<Col xs={12} md={3}>
				<Alert key="warning" variant="warning">   
					Sample credentials 
					<ul><li>admin@example.com / password</li><li>banana2 / potato</li></ul>
				</Alert>
			</Col>
		</Row>
	);
}

export default LoginForm