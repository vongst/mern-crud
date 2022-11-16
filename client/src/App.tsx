import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';

import { Login } from './features/login/Login';
import ProductList from './features/productlist/ProductList';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectUserName, selectIsLoggedIn, userLogOut } from './features/login/loginSlice';
import { BsBoxArrowRight, BsPersonCheck } from 'react-icons/bs'

function App() {

  const userName = useAppSelector(selectUserName) || '';
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Navbar expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand>MightyFoo Admin</Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search products"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary">Search</Button>
          </Form>

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