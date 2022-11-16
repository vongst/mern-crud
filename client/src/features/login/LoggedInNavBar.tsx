import { Nav, Navbar } from "react-bootstrap";
import { BsBoxArrowRight, BsPersonCheck } from 'react-icons/bs'

import { useAppDispatch } from '../../app/hooks'
import { userLogOut } from './loginSlice'

const LoggedInNavBar = (props: any) => {
    const dispatch = useAppDispatch();
    
    return(
        <Nav className="justify-content-end">
            <Navbar.Text className="me-4">
              <BsPersonCheck className="me-2"/> <strong>{props.username}</strong>
            </Navbar.Text>
            <Nav.Link onClick={() => dispatch(userLogOut())}>Logout <BsBoxArrowRight className="ml-2" /></Nav.Link>
          </Nav>
    )
}

export default LoggedInNavBar;