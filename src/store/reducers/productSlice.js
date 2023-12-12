import { BASE_API } from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products: [],
  totalProduct: 0,
  isLoadingProducts: false,
  productDetails: {},
  isLoadingProductDetails: false
}

export const getProductsAPI = createAsyncThunk('product/get-all', async (params) => {
  try {
    const { data } = await axios.get(`${BASE_API}/product`, {
      params
    })
    return data
  } catch (error) {
    return error
  }
})

export const getAProductAPI = createAsyncThunk('product/get-one', async (id) => {
  try {
    const { data } = await axios.get(`${BASE_API}/product/${id}`)
    return data
  } catch (error) {
    return error
  }
})

export const addToWishListAPI = createAsyncThunk('product/add-to-wishlist', async (payload) => {
  try {
    const { data } = await axios.put(`${BASE_API}/product/wishlist`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const rateProductAPI = createAsyncThunk('product/rate', async (payload) => {
  try {
    const { data } = await axios.put(`${BASE_API}/product/rating`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null
    //   window.location.reload()
    // }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getProductsAPI.pending, (state) => {
      state.isLoadingProducts = true
    })
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getProductsAPI.fulfilled, (state, action) => {
      state.products = action.payload?.data || []
      state.totalProduct = action.payload?.total || 0
      state.isLoadingProducts = false
    })
    builder.addCase(getProductsAPI.rejected, (state) => {
      state.isLoadingProducts = false
    })

    builder.addCase(getAProductAPI.pending, (state) => {
      state.isLoadingProductDetails = true
    })
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAProductAPI.fulfilled, (state, action) => {
      state.productDetails = action.payload
      state.isLoadingProductDetails = false
    })
    builder.addCase(getAProductAPI.rejected, (state) => {
      state.isLoadingProductDetails = false
    })
  }
})

// Action creators are generated for each case reducer function
// export const { logout } = authSlice.actions
export default productSlice.reducer
