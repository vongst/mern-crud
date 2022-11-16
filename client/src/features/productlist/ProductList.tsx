import { useEffect } from "react";
import { Alert, Badge, Stack, Spinner } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import ProductListItem from "./ProductListItem";
import { selectAllProducts, fetchProductList, selectAlert } from './productListSlice';
import './ProductList.scss';
import ProductListItemEdit from "./ProductListItemEdit";

function ProductList() {
    // console.log(useAppSelector(state => state));

    const dispatch = useAppDispatch()
    const products = useAppSelector(selectAllProducts)
    const alert = useAppSelector(selectAlert)
    const productListStatus = useAppSelector(state => state.productList.status)
    const error = useAppSelector((state) => state.productList.error)

    
    useEffect(() => {
      if (productListStatus === 'idle') {
          dispatch(fetchProductList())
      }
    }, [productListStatus, dispatch])

    let content;

    if (productListStatus === 'loading') {
      content = <Spinner animation="border" variant="primary" />
    } else if (productListStatus === 'succeeded') {
      content = products.map((product) => {
        return (
          <ProductListItem key={product._id} editMode={'create'} {...product}  />
        );
      }
      )
    } else if (productListStatus === 'failed') {
      content = <div>errror</div>
    }

    return(
        <div className="me-3 m-3">
            { alert ? <Alert key={alert.type} variant={alert.type}>{alert.message}</Alert> : ''}
            <div className="mb-4">
              <ProductListItemEdit />
            </div>
            <h1 className="mt-5 mb-4 ms-3">
              Product List 
              <Badge id="productlist-badge" bg="primary" pill>{products.length}</Badge>
            </h1>

            
            


            <Stack gap={2} id="productlist" >
              {content}
            </Stack>
        </div>
    )
}
export default ProductList;