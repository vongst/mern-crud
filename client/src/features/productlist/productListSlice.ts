import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCount } from './productListAPI';
import axios from 'axios';


// export interface MyInterface extends Array<MyType> { }

export interface ProductListState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error?: string | null,
  products: any[],
}

const initialState: ProductListState = {
  status: 'idle',
  error: null,
  products: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchProductList = createAsyncThunk('products/fetchProductList', async () => {
  const response = await axios.get('http://localhost:5000/product')
  // console.log('response.data');
  return response.data
})

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
    productDelete: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      state.products = state.products.filter((item, index) => item._id !== action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductList.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched productList to the array
        state.products = state.products.concat(action.payload)
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { userLogIn, productDelete } = productListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAllProducts = (state: RootState) => state.productList.products


export default productListSlice.reducer;
