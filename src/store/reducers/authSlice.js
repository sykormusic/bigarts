import { BASE_API } from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: null,
  isLoadingLogin: false,
  isLoadingSignUp: false
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
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
  }
})

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions
export default authSlice.reducer
