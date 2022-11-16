import { useEffect } from "react";
import { Alert, Badge, Stack, Spinner } from "react-bootstrap";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { productListAsync, selectAlert } from "./productListSlice";

import ProductListItem from "./ProductListItem";
import ProductListItemEdit from "./ProductListItemEdit";

import "./ProductList.scss";

const ProductList = () => {
  // console.log(useAppSelector(state => state));

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productList.products);
  const productListStatus = useAppSelector((state) => state.productList.status);
  const error = useAppSelector((state) => state.productList.error);

  const alert = useAppSelector(selectAlert);

  useEffect(() => {
    if (productListStatus !== "succeeded") {
      dispatch(productListAsync());
    }
  }, [productListStatus, dispatch]);

  let content;

  if (productListStatus === "loading") {
    content = (
      <div className="d-flex justify-content-center">
        <Spinner animation="grow" className="m-5" variant="primary" />
      </div>
    );
  } else if (productListStatus === "succeeded") {
    content = products.map((product) => (
      <ProductListItem key={product._id} editMode={"create"} {...product} />
    ));
  }

  return (
    <div className="me-3 m-3">
      <ProductListItemEdit className="mb-4" />
      <h1 className="mt-5 mb-4 ms-3">
        Product List{" "}
        <Badge id="productlist-badge" bg="primary" pill>
          {products.length}
        </Badge>
      </h1>
      {alert ? (
        <Alert key={alert.type} variant={alert.type}>
          {alert.message}
        </Alert>
      ) : (
        ""
      )}
      <Stack gap={2} id="productlist">
        {content}
      </Stack>
    </div>
  );
};
export default ProductList;
