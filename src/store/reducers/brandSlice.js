import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  brands: []
}

export const getBrandsAPI = createAsyncThunk('brand/get-all', async (params) => {
  try {
    const { data } = await api.get(`/brand`, params)
    return data
  } catch (error) {
    return error
  }
})

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null
    //   window.location.reload()
    // }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getBrandsAPI.fulfilled, (state, action) => {
      state.brands = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// export const { logout } = authSlice.actions
export default brandSlice.reducer
