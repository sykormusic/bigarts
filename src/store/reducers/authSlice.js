import { BASE_API } from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd'
import axios from 'axios'

const initialState = {
  user: null,
  isLoadingLogin: false,
  isLoadingSignUp: false,
  myOrders: [],
  myWishlist: []
}

export const loginAPI = createAsyncThunk('user/login', async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_API}/user/login`, payload)
    return data
  } catch (error) {
    return error
  }
})

export const signupAPI = createAsyncThunk('user/sign-up', async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_API}/user/register`, payload)
    return data
  } catch (error) {
    return error
  }
})

export const logoutAPI = createAsyncThunk('user/logout', async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/user/logout`)
    return data
  } catch (error) {
    return error
  }
})

export const updateUserAPI = createAsyncThunk('user/update', async (payload) => {
  try {
    const { data } = await axios.put(`${BASE_API}/user/edit-user`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

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
    const { data } = await axios.get(`${BASE_API}/user/get-wishlist`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      localStorage.removeItem('token')
      window.location.reload()
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAPI.pending, (state) => {
      state.isLoadingLogin = true
    })
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      state.isLoadingLogin = false
      state.user = action.payload
      localStorage.setItem('token', action.payload.token)
    })
    builder.addCase(loginAPI.rejected, (state) => {
      state.isLoadingLogin = false
    })
    builder.addCase(signupAPI.pending, (state) => {
      state.isLoadingSignUp = true
    })
    builder.addCase(signupAPI.fulfilled, (state, action) => {
      state.isLoadingSignUp = false
      state.user = action.payload
    })
    builder.addCase(signupAPI.rejected, (state) => {
      state.isLoadingSignUp = false
    })

    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload }
      notification.success({
        message: 'Thành công',
        description: 'Cập nhật thông tin thành công'
      })
    })

    builder.addCase(getMyOrdersAPI.fulfilled, (state, action) => {
      state.myOrders = [action.payload]
    })

    builder.addCase(getMyWishlistAPI.fulfilled, (state, action) => {
      state.myWishlist = [action.payload]
    })
  }
})

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions
export default authSlice.reducer
