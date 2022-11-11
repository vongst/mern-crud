import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';

import ProductList from './ProductList/ProductList';
import LoginForm from './Login/LoginForm';
import { Counter } from './features/counter/Counter';

function App() {
  return (
    <div>
      <Navbar expand="lg" variant="light" bg="light">
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

          <Nav className="justify-content-end">
            <Navbar.Text>
              Signed in as: <strong>admin</strong>
            </Navbar.Text>
            <Nav.Link href="#home">Logout</Nav.Link>
          </Nav>
          
        </Container>
      </Navbar>
      
      <Container>
      <Router>
        <Switch>
          <Route path="/products">
            <ProductList />
            <Counter />
          </Route>
          <Route path="/">
            <LoginForm />
          </Route>
        </Switch>
      </Router>
      </Container>
    </div>
  );
}

export default App;