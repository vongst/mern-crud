import { Button, Col, Container, Form, Row } from "react-bootstrap";

function LoginForm() {
    return(
    <Row>
      <Col xs={12} md={{ span: 4, offset: 4 }}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      </Col>
    </Row>
    )
}
export default LoginForm;