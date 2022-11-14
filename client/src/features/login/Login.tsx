import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  userLogIn,
  userLogOut,
  loginAsync,
  selectCount,
  selectIsLoggedIn,
  selectUserName,
} from './loginSlice';

export function Login() {

  const userName = useAppSelector(selectUserName) || '';
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const [ adminUserName, setAdminUserName ] = useState('admin');
  

  return (
    <div>
      Logged in?: {isLoggedIn ? 'true' : 'false'} {userName}

      <Form.Control type="text" value={adminUserName} onChange={(e) => setAdminUserName(e.target.value)}/>
      <Button variant="primary" onClick={() => dispatch(userLogIn(adminUserName))}>Log In as {adminUserName}</Button>
      <Button variant="danger" onClick={() => dispatch(userLogOut())}>Log Out</Button>

      <Button variant="primary" onClick={() => dispatch(userLogIn(adminUserName))}>Log In Async as {adminUserName}</Button>
      
      <br /><br />
      <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button aria-label="Increment value" onClick={() => dispatch(increment())}>+</button>
      
    </div>
  );
}
