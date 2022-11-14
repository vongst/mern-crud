import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import ProductListItem from "./ProductListItem";
import { selectAllProducts, fetchProductList } from './productListSlice';

function ProductList() {
    // console.log(useAppSelector(state => state));

    const dispatch = useAppDispatch()
    const products = useAppSelector(selectAllProducts)
    const productListStatus = useAppSelector(state => state.productList.status)
    const error = useAppSelector((state) => state.productList.error)


    useEffect(() => {
      if (productListStatus === 'idle') {
          dispatch(fetchProductList())
      }
    }, [productListStatus, dispatch])

    let content;

    if (productListStatus === 'loading') {
      content = <div>loading...</div>
    } else if (productListStatus === 'succeeded') {
      content = products.map((product) => {
        return (
          <ProductListItem {...product} />
        );
      }
      )
    } else if (productListStatus === 'failed') {
      content = <div>errror</div>
    }

    return(
        <div>
            <h1>Product List ({products.length})</h1>
            {content}
        </div>
    )
}
export default ProductList;