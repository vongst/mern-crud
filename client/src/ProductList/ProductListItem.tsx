import { Button, Col, Row } from "react-bootstrap";

function ProductListItem() {
    return(
        <Row>
            <Col>Image:</Col>
            <Col>SKU:</Col>
            <Col>Title:</Col>
            <Col md={3} xs={12}>
              <Button variant="outline-primary">Edit</Button>
              <Button variant="outline-danger">Delete</Button>
            </Col>
        </Row>
    )
}
export default ProductListItem;