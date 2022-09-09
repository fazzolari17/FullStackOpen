import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  author: '',
  url: '',
  added: false

}
const blogFormSlice = createSlice({
  name: 'blogForm',
  initialState,
  reducers: {
    setTitle(state, action) {
      return { ...state, title: action.payload }
    },
    setAuthor(state, action) {
      return { ...state, author: action.payload }
    },
    setUrl(state, action) {
      return { ...state, url: action.payload }
    },
    setAdded(state, action) {
      return { ...state, added: action.payload }
    },
    reset(state, action) {
      return state = action.payload
    }
  }
})

export const addTitle = content => {
  return async dispatch => {
    dispatch(setTitle(content))
  }
}

export const addAuthor = content => {
  return async dispatch => {
    dispatch(setAuthor(content))
  }
}

export const addUrl = content => {
  return async dispatch => {
    dispatch(setUrl(content))
  }
}

export const resetForm = () => {
  return async dispatch => {
    dispatch(reset(initialState))
  }
}

export const toggleAdded = time => {
  return async dispatch => {
    dispatch(setAdded(true))

    setTimeout(() => {
      dispatch(setAdded(false))
      resetForm()
    }, time)}
}

export const { setTitle, setAuthor, setUrl,  reset, setAdded } = blogFormSlice.actions
export default blogFormSlice.reducer