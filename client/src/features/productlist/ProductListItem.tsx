import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { productDelete } from "./productListSlice";

const ProductListItem = (product: any) => {
    const dispatch = useAppDispatch();

    return(
        <Row>
            <Col>ID: {product._id}</Col>
            <Col>Image: {product.image}</Col>
            <Col>SKU: {product.sku}</Col>
            <Col>Title: {product.title}</Col>
            <Col md={3} xs={12}>
              <Button variant="outline-primary">Edit</Button>
              <Button variant="outline-danger" onClick={() => dispatch(productDelete(product._id))}>Delete</Button>
            </Col>
        </Row>
    )
}
export default ProductListItem;