import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

const blogPostSlice = createSlice({
  name: 'blogPost',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return  state = action.payload
    },
    clearBlogs(state, action) {
      return state = action.payload
    },
    appendBlogs(state, action) {
      state.push(action.payload)
    },
    removeABlog(state, action) {
      const updatedState = state.filter(item => item.id !== action.payload)
      return state = updatedState
    },
    updateLikes(state, action) {
      const updatedState = state.map(item => item.id !== action.payload ? item : { ...item, likes: item.likes + 1 } )
      return state = updatedState
    }
  }
})

export const initializeState = (token) => {
  return async dispatch => {
    const blogs = await blogService.getAll(token)
    dispatch(setBlogs(blogs))
  }
}

export const removeAllBlogs = () => {
  return async dispatch => {
    dispatch(clearBlogs([]))
  }
}

export const createNew = content => {
  return async dispatch => {
    const response = await blogService.create(content)
    dispatch(appendBlogs(response))
  }
}

export const removeBlogFromState = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeABlog(id))
  }
}

export const addLikes = (id, updatedObject) => {
  return async dispatch => {
    await blogService.update(id, updatedObject)
    dispatch(updateLikes(id))
  }
}


export const { setBlogs, clearBlogs, appendBlogs, removeABlog, updateLikes } = blogPostSlice.actions
export default blogPostSlice.reducer