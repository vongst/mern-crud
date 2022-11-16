import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCount } from './productListAPI';
import axios from 'axios';


// export interface MyInterface extends Array<MyType> { }

export interface ProductListState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error?: string | null,
  products: any[],
  alert?: {type: string, message: string} | null,
}

const initialState: ProductListState = {
  status: 'idle',
  error: null,
  products: [],
  alert: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.


export const productListAsync = createAsyncThunk(
  'products/fetchList',
  async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL + 'product')
    return response.data;
  }
);


export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions

  /* create
  *  update/edit
  *  delete
  */
  reducers: {
    userLogIn: (state, action: PayloadAction<string>) => {
      state.error = 'error';
    },
    productCreate: (state, action: PayloadAction<{title: string, image: string, sku: string}>) => {
      console.log(action.payload)
      state.status = 'idle';

      axios.post(process.env.REACT_APP_API_URL + 'product/add', action.payload);
      // How to make async?

      state.alert = { type: "success", message: "Product " + action.payload.title + " has been created!" }
      state.products = state.products
    },
    productUpdate: (state, action: PayloadAction<{product_id: string, title: string, image: string, sku: string}>) => {
   
      state.status = 'idle';
      axios.post(process.env.REACT_APP_API_URL + 'update/' + action.payload.product_id, action.payload )
      .then((res) => { console.log(res) })
      // How to make async?

      state.alert = { type: "success", message: "Product SKU " + action.payload.sku + " has been updated!" }
    },
    productDelete: (state, action: PayloadAction<string>) => {
      state.status = 'idle';

      // console.log(action.payload)
      axios.delete(process.env.REACT_APP_API_URL + '/' + action.payload)
      .then((response) => {
        console.log('productDelete > axios.delete > .then\n' + JSON.stringify(response))
      })
      

      state.alert = { type: "success", message: "Product " + action.payload + " has been deleted!" }
      // How to make async?
      

    }
  },
  extraReducers(builder) {
    builder
   
      .addCase(productListAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(productListAsync.fulfilled, (state, action) => {
        console.log("productListAsync.fulfilled\n " + JSON.stringify(state) + JSON.stringify(action))
        state.status = 'succeeded'
        state.products = action.payload
      })
      .addCase(productListAsync.rejected, (state, action) => {
        console.log("productListAsync.rejected\n ")
        state.status = 'failed'
        state.error = action.error.message
      });
  }
});

export const { userLogIn, productCreate, productDelete, productUpdate } = productListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAllProducts = (state: RootState) => state.productList.products
export const selectAlert = (state: RootState) => state.productList.alert


export default productListSlice.reducer;
