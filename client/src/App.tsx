import React from 'react'

import LoginForm from './features/login/LoginForm'
import ProductList from './features/productlist/ProductList'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { selectUserName, selectIsLoggedIn, userLogOut } from './features/login/loginSlice'

import { Container, Nav, Navbar } from 'react-bootstrap'
import LoggedInNavBar from './features/login/LoggedInNavBar'

function App() {

  const userName = useAppSelector(selectUserName) || '';
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" className='p-2'>
        <Container>
          <Navbar.Brand>MightyFoo Admin</Navbar.Brand>
          {isLoggedIn ? <LoggedInNavBar username={userName} /> : '' }
        </Container>
      </Navbar>
      
      <Container className="p-2">
       {isLoggedIn ? <ProductList /> : <LoginForm /> }
      </Container>
    </>
  );
}

export default App;