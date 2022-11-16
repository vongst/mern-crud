import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState, useRef } from "react";
import { Button, Col, Row, Image, Stack, Card } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { BsPencil, BsBagPlus} from "react-icons/bs";
import { productCreate, productUpdate } from './productListSlice';


const ProductListItemEdit = (props: any) => {
    const dispatch = useAppDispatch();
    
    const [ productImage, setProductImage ] = useState(props.image);
    const [ productSKU, setProductSKU ] = useState(props.sku);
    const [ productTitle, setProductTitle ] = useState(props.title);

    
    let itemTitle = <div><BsBagPlus /> Add new record </div>
    let submitButton = <Button variant="primary" type="submit"><BsPencil /> Create</Button>
    if (props._id ) { 
        itemTitle = <div><small>Edit Product ID: </small>  
        <code>{props._id}</code></div>;    
        submitButton = <Button variant="primary" type="submit"><BsPencil /> Update item</Button>
    } 

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = {
            product_id: props._id,
            title: event.target.product_title.value,
            image: event.target.product_image.value,
            sku: event.target.product_sku.value,
        }
        if (props._id === undefined) {
            dispatch(productCreate(formData));
        } else {
            dispatch(productUpdate(formData));

        }
        event.target.reset();
    }

    return(
        <Form onSubmit={handleSubmit}>

        <Row id={props._id} className="border rounded p-3">
            <Col xs={12} className="mb-3">
                {itemTitle}
            </Col>
            <Col md={2} xs={12} className="product-img">
                <FloatingLabel label="Image path">
                    <Form.Control type="text" id="product_image" name="product_image" value={productImage} onChange={(e) => setProductImage(e.target.value)} />
                </FloatingLabel>
            </Col>

            <Col md={2} xs={12} className="product-sku">
                <FloatingLabel label="SKU">
                    <Form.Control type="text" required id="product_sku" name="product_sku" value={productSKU} onChange={(e) => setProductSKU(e.target.value)}  />
                </FloatingLabel>
            </Col>
            
            <Col md={5} xs={12} className="product-title">
            <FloatingLabel label="Title">
                <Form.Control type="text" required id="product_title" name="product_title" value={productTitle} onChange={(e) => setProductTitle(e.target.value)}  />
            </FloatingLabel>
            </Col>

            <Col md={3} xs={12} className="product-actions justify-content-end">
                <Stack direction="horizontal" gap={3}>
                {submitButton}
                <Button variant="outline-secondary">Clear</Button>
                </Stack>
            </Col>
        </Row>
        </Form>
    )
}
export default ProductListItemEdit;