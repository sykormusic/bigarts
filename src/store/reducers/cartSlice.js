import { BASE_API } from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

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
    const { data } = await axios.post(`${BASE_API}/user/cart`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const applyCouponAPI = createAsyncThunk('cart/apply-coupon', async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_API}/user/cart/applycoupon`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const emptyCartAPI = createAsyncThunk('cart/empty-cart', async () => {
  try {
    const { data } = await axios.delete(`${BASE_API}/user/empty-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const getUserCartAPI = createAsyncThunk('cart/get-user-cart', async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/user/cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const createCashOrderAPI = createAsyncThunk('cart/create-cash-order', async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_API}/user/cart/cash-order`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = {
        product: action.payload.product,
        count: action.payload.count
      }

      const existItem = state.cart.products.find((x) => x.product._id === newItem.product._id)
      if (existItem) {
        existItem.count += newItem.count
      } else {
        state.cart.products = [...state.cart.products, newItem]
      }
    },
    updateCartQty: (state, action) => {
      const { _id, count } = action.payload

      const item = state.cart.products.find((x) => x._id === _id)

      if (item) {
        item.count = count
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      state.cart.products = state.cart.products.filter((x) => x._id !== id)
    },
    updateCart: (state, action) => {
      state.cart.products = state.cart.products.map((x) => (x._id === action.payload._id ? action.payload : x))
    }
  },
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
  }
})

// Action creators are generated for each case reducer function
export const { addToCart, decreaseCart, removeFromCart, updateCart, updateCartQty } = cartSlice.actions
export default cartSlice.reducer
