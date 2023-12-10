import { BASE_API } from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  blogs: [],
  isLoadingBlogDetails: false,
  isLoadingBlogs: false
}

export const getBlogsAPI = createAsyncThunk('blog/get-all', async (params) => {
  try {
    const { data } = await axios.get(`${BASE_API}/blog`, params)
    return data
  } catch (error) {
    return error
  }
})

export const getABlogAPI = createAsyncThunk('blog/get-one', async (id) => {
  try {
    const { data } = await axios.get(`${BASE_API}/blog/${id}`)
    return data
  } catch (error) {
    return error
  }
})

export const likeBlogAPI = createAsyncThunk('blog/like', async (payload) => {
  try {
    const { data } = await axios.put(`${BASE_API}/blog/likes`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const dislikeBlogAPI = createAsyncThunk('blog/dislike', async (payload) => {
  try {
    const { data } = await axios.put(`${BASE_API}/blog/dislikes`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getBlogsAPI.fulfilled, (state, action) => {
      state.blogs = action.payload
      state.isLoadingBlogs = false
    })
    builder.addCase(getBlogsAPI.pending, (state) => {
      state.isLoadingBlogs = true
    })
    builder.addCase(getBlogsAPI.rejected, (state) => {
      state.isLoadingBlogs = false
    })

    builder.addCase(getABlogAPI.pending, (state) => {
      state.isLoadingBlogDetails = true
    })
    builder.addCase(getABlogAPI.fulfilled, (state) => {
      state.isLoadingBlogDetails = false
    })

    builder.addCase(getABlogAPI.rejected, (state) => {
      state.isLoadingBlogDetails = false
    })
  }
})

// Action creators are generated for each case reducer function
// export const { logout } = authSlice.actions
export default blogSlice.reducer
