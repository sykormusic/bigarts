import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: {
    cartTotal: 0,
    products: []
  },
  loadingCreateOrder: false,
  loadingGetCart: false
}

export const userCartAPI = createAsyncThunk('cart/add-to-cart', async (payload) => {
  try {
    const { data } = await api.post(`/user/cart`, payload)
    return data
  } catch (error) {
    return error
  }
})

export const applyCouponAPI = createAsyncThunk('cart/apply-coupon', async (payload) => {
  try {
    const res = await api.post(`/user/cart/applycoupon`, payload)
    return res
  } catch (error) {
    return error
  }
})

export const emptyCartAPI = createAsyncThunk('cart/empty-cart', async () => {
  try {
    const { data } = await api.delete(`/user/empty-cart`)
    return data
  } catch (error) {
    return error
  }
})

export const getUserCartAPI = createAsyncThunk('cart/get-user-cart', async () => {
  try {
    const { data } = await api.get(`/user/cart`)
    return data
  } catch (error) {
    return error
  }
})

export const createCashOrderAPI = createAsyncThunk('cart/create-cash-order', async (payload) => {
  try {
    const { data } = await api.post(`/user/cart/cash-order`, payload)
    return data
  } catch (error) {
    return error
  }
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserCartAPI.pending, (state) => {
      state.loadingGetCart = true
    })

    builder.addCase(getUserCartAPI.fulfilled, (state, action) => {
      if (action.payload) {
        state.cart = action.payload
      } else {
        state.cart = {
          cartTotal: 0,
          products: []
        }
      }
      state.loadingGetCart = false
    })
    builder.addCase(getUserCartAPI.rejected, (state) => {
      state.loadingGetCart = false
    })
    builder.addCase(createCashOrderAPI.pending, (state) => {
      state.loadingCreateOrder = true
    })
    builder.addCase(createCashOrderAPI.fulfilled, (state) => {
      state.checkoutItems = []
      state.cart = {
        cartTotal: 0,
        products: []
      }
      state.loadingCreateOrder = false
    })
    builder.addCase(createCashOrderAPI.rejected, (state) => {
      state.loadingCreateOrder = false
    })
    // builder.addCase(userCartAPI.fulfilled, (state, action) => {
    //   state.cart = action.payload
    // })
  }
})

// Action creators are generated for each case reducer function
export default cartSlice.reducer
