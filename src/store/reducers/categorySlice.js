import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: []
}

export const getCategoriesAPI = createAsyncThunk('category/get-all', async (params) => {
  try {
    const { data = [] } = await api.get(`/category`, params)
    return data
  } catch (error) {
    return error
  }
})

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null
    //   window.location.reload()
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesAPI.fulfilled, (state, action) => {
      state.categories = action.payload || []
    })
  }
})

// Action creators are generated for each case reducer function
// export const { logout } = authSlice.actions
export default categorySlice.reducer
