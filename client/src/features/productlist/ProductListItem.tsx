import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState } from "react";
import { Button, Col, Row, Image, Stack } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { productDelete } from "./productListSlice";
import { BsPencil } from "react-icons/bs";

import ProductListItemEdit from "./ProductListItemEdit";

const ProductListItem = (product: any) => {
    const dispatch = useAppDispatch();
    const [ editMode, setEditMode ] = useState(false);

    if (editMode) {
        return (<ProductListItemEdit editMode={'update'} {...product} />)
    }

    return(
        <Row id={product._id} className="product-row p-3">
            <Col md={2} xs={12} className="product-img">
                <Image thumbnail={true} src={product.image} width={150} />
            </Col>

            <Col md={2} xs={12} className="product-sku">
                <small className="me-1">SKU</small> 
                <code>{product.sku}</code>
            </Col>
            
            <Col md={5} xs={12} className="product-title">
                <strong>{product.title}</strong>
            </Col>

            <Col md={3} xs={12} className="product-actions flex-row justify-content-center">
                <Stack direction="horizontal" gap={3}>
                    <Button variant="outline-primary" onClick={() => setEditMode(true)}><BsPencil /> Edit</Button>
                    <Button variant="outline-danger" onClick={() => dispatch(productDelete(product._id))}>Delete</Button>
                </Stack>
            </Col>
        </Row>
    )
}
export default ProductListItem;