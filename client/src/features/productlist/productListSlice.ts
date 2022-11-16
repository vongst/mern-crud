import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import axios from 'axios'

// Move axios to another file
const api = axios.create({
  baseURL: 'https://mern-crud-7n6j.onrender.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export interface ProductListState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string | null
  products: any[]
  alert?: { type: string, message: string } | null
}

const initialState: ProductListState = {
  status: 'idle',
  error: null,
  products: [],
  alert: null
}

export const productListAsync = createAsyncThunk(
  'products/fetchList',
  async () => {
    const response = await api.get('product')
    return response.data
  }
)

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    afterCreate: (
      state,
      action: PayloadAction<{ title: string, image: string, sku: string }>
    ) => {
      state.products = state.products.concat(action.payload)
      state.alert = {
        type: 'success',
        message: 'Product ' + action.payload.title + ' has been created!'
      }
    },
    afterUpdate: (
      state,
      action: PayloadAction<{
        product_id: string
        title: string
        image: string
        sku: string
      }>
    ) => {
      state.products = state.products.map((product) => {
        // Update the correct product with the new payload
        if (product._id === action.payload.product_id) {
          return action.payload
        } else {
          return product
        }
      })

      state.alert = {
        type: 'success',
        message: 'Product SKU ' + action.payload.sku + ' has been updated!'
      }
    },
    afterDelete: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      )
      state.alert = {
        type: 'info',
        message: `Product ID ${action.payload} has been deleted`
      }
    }
  },
  extraReducers (builder) {
    builder
      .addCase(productListAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(productListAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload
      })
      .addCase(productListAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

const { afterCreate, afterDelete, afterUpdate } = productListSlice.actions

export const selectAllProducts = (state: RootState) =>
  state.productList.products

export const selectAlert = (state: RootState) => state.productList.alert

export default productListSlice.reducer

type DispatchFn = (...args: unknown[]) => unknown

export const createProduct = (payload: Record<string, any>) => {
  return async (dispatch: DispatchFn) => {
    api.post('product/add', payload).then((res) => {
      dispatch(afterCreate(res.data))
    })
  }
}

export const updateProduct = (id: string, payload: Record<string, any>) => {
  return async (dispatch: DispatchFn) => {
    api.post(`update/${id}`, payload).then((res) => {
      dispatch(afterUpdate(res.data))
    })
  }
}

export const deleteProduct = (id: string) => {
  return async (dispatch: DispatchFn) => {
    api.delete(`/${id}`).then(() => {
      dispatch(afterDelete(id))
    })
  }
}
