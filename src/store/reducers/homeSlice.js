import { BASE_API } from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  featuredProducts: [],
  specialProducts: [],
  popularProducts: []
}

export const getFeaturedProducts = createAsyncThunk('home/get-featured', async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/product`, {
      params: {
        tags: 'featured'
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const getSpecialProducts = createAsyncThunk('home/get-special', async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/product`, {
      params: {
        tags: 'special'
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const getPopularProducts = createAsyncThunk('home/get-popular', async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/product`, {
      params: {
        tags: 'popular'
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null
    //   window.location.reload()
    // }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getFeaturedProducts.fulfilled, (state, action) => {
      state.featuredProducts = action.payload
    })
    builder.addCase(getSpecialProducts.fulfilled, (state, action) => {
      state.specialProducts = action.payload
    })
    builder.addCase(getPopularProducts.fulfilled, (state, action) => {
      state.popularProducts = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// export const { logout } = authSlice.actions
export default homeSlice.reducer
