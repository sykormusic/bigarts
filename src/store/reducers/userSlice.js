import { BASE_API } from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  myOrders: [],
  myWishlist: []
}

export const getMyOrdersAPI = createAsyncThunk('user/my-orders', async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/user/get-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const getMyWishlistAPI = createAsyncThunk('user/my-wishlist', async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/user/wishlist`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMyOrdersAPI.fulfilled, (state, action) => {
      state.myOrders = action.payload
    })

    builder.addCase(getMyWishlistAPI.fulfilled, (state, action) => {
      state.myWishlist = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export default userSlice.reducer
