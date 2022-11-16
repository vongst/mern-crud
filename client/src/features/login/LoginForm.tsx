import React, { useState } from 'react';
import { Button, Col, Form, Row, FloatingLabel, Stack, Card, Alert, Spinner } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  userLogIn,
  userLogOut,
  selectIsLoggedIn,
  selectUserName,
  selectToken,
  loginAsync
} from './loginSlice';
import { BsPersonX } from 'react-icons/bs'

const LoginForm = () => {

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userName = useAppSelector(selectUserName) || '';
  const token = useAppSelector(selectToken) || null;

  const loginStatus = useAppSelector(state => state.login.status)

  const dispatch = useAppDispatch();

  const [ adminUserName, setAdminUserName ] = useState('admin@example.com')
  const [ adminPassword, setAdminPassword ] = useState('password')

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = {
        username: adminUserName,
        password: adminPassword,
    }
    dispatch(loginAsync(formData))
}
  return (
    <div>


      <Row className='mt-5'>
      <Col xs={12} md={{ span: 6, offset: 3 }}>
        <Card className='p-5'>
          <h2 className="mb-5">Login</h2>
          
      <Form onSubmit={handleSubmit}>
      { loginStatus == 'failed' ? <Alert key="danger" variant="danger"><BsPersonX /> Authentication failed.</Alert> : ''}

      <Stack gap={3}>


        <FloatingLabel label="Username">
          <Form.Control size="lg" type="text" value={adminUserName} onChange={(e) => setAdminUserName(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel label="Password">
          <Form.Control size="lg" type="text" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}/>
        </FloatingLabel>

      { loginStatus == 'loading' ? 
        <Button variant="primary" size="lg" disabled>
          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> 
          Authenticating street cred...
        </Button> 
      : <Button variant="primary" size="lg" type="submit">Login</Button> }

        
      </Stack>

      </Form>

      </Card>
      </Col>
      <Col xs={12} md={3}>
      <Alert key="warning" variant="warning">   
          Sample credentials 
          <ul>
            <li>admin@example.com / password</li>
            <li>banana2 / potato</li>
          </ul>
      
      </Alert></Col>
    </Row>
      
    
    </div>
  );
}

export default LoginForm