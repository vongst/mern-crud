import React from 'react'

import { Login } from './features/login/Login'
import ProductList from './features/productlist/ProductList'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { selectUserName, selectIsLoggedIn, userLogOut } from './features/login/loginSlice'

import { Container, Nav, Navbar } from 'react-bootstrap'
import { BsBoxArrowRight, BsPersonCheck } from 'react-icons/bs'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const userName = useAppSelector(selectUserName) || '';
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark" className='p-4'>
        <Container>
          <Navbar.Brand>MightyFoo Admin</Navbar.Brand>
          {isLoggedIn ?
          <Nav className="justify-content-end">
            <Navbar.Text className="me-4">
              <BsPersonCheck className="me-2"/> <strong>{userName}</strong>
            </Navbar.Text>
            <Nav.Link onClick={() => dispatch(userLogOut())}>Logout <BsBoxArrowRight className="ml-2" /></Nav.Link>
          </Nav>
           : '' }
          
        </Container>
      </Navbar>
      
      <Container className="p-2">
       {isLoggedIn ? <ProductList /> : <Login /> }
      </Container>
    </div>
  );
}

export default App;