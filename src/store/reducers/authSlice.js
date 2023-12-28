import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'

const initialState = {
  user: null,
  isLoadingLogin: false,
  isLoadingSignUp: false,
  isLoadingForgot: false
}

export const loginAPI = createAsyncThunk('user/login', async (payload) => {
  try {
    const res = await api.post(`/user/login`, payload)
    return res
  } catch (error) {
    return error
  }
})

export const signupAPI = createAsyncThunk('user/sign-up', async (payload) => {
  try {
    const res = await api.post(`/user/register`, payload)
    return res
  } catch (error) {
    return error
  }
})

export const logoutAPI = createAsyncThunk('user/logout', async () => {
  try {
    const { data } = await api.get(`/user/logout`)
    return data
  } catch (error) {
    return error
  }
})

export const forgotPwdAPI = createAsyncThunk('user/reset-pwd', async (payload) => {
  try {
    const { data } = await api.post(`/user/forgot-password-token`, payload)
    return data
  } catch (error) {
    return error
  }
})

export const resetPwdAPI = createAsyncThunk('user/reset-pwd', async (payload) => {
  try {
    const { data } = await api.put(`/user/reset-password/${payload.token}`, {
      password: payload.password
    })
    return data
  } catch (error) {
    return error
  }
})

export const changePwdAPI = createAsyncThunk('user/change-pwd', async (payload) => {
  try {
    const { data } = await api.put(`/user/password`, {
      password: payload.password
    })
    return data
  } catch (error) {
    return error
  }
})

export const updateUserAPI = createAsyncThunk('user/update', async (payload) => {
  try {
    const { data } = await api.put(`/user/edit-user`, payload)
    return data
  } catch (error) {
    return error
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginAPI.pending, (state) => {
      state.isLoadingLogin = true
    })
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      state.isLoadingLogin = false
      localStorage.setItem('token', action.payload.data?.token)
      state.user = action.payload?.data
    })
    builder.addCase(loginAPI.rejected, (state) => {
      state.isLoadingLogin = false
    })
    builder.addCase(signupAPI.pending, (state) => {
      state.isLoadingSignUp = true
    })
    builder.addCase(signupAPI.fulfilled, (state) => {
      state.isLoadingSignUp = false
      // state.user = action.payload?.data
    })
    builder.addCase(signupAPI.rejected, (state) => {
      state.isLoadingSignUp = false
    })

    builder.addCase(forgotPwdAPI.pending, (state) => {
      state.isLoadingForgot = true
    })
    builder.addCase(forgotPwdAPI.fulfilled, (state) => {
      state.isLoadingForgot = false
    })
    builder.addCase(forgotPwdAPI.rejected, (state) => {
      state.isLoadingForgot = false
    })

    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload }
      message.success('Cập nhật thông tin thành công')
    })

    builder.addCase(logoutAPI.fulfilled, (state) => {
      state.user = null
      localStorage.clear()
      window.location.href = '/'
    })
  }
})

// Action creators are generated for each case reducer function
export default authSlice.reducer
