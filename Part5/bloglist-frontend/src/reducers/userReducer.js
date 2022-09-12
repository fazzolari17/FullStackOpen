import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogService'
import { setNotification } from './notificationReducer'
import { initializeState } from './blogPostListReducer'

const initialState = null
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return state = action.payload
    },
    resetUser(state, action) {
      return state = action.payload
    }
  }
})

export const login = (username, password) => {
  return async dispatch => {
    try {
      const response = await loginService.login({ username, password })
      dispatch(setUser(response))
      dispatch(initializeState(response.token))
      blogService.setToken(response.token)
      localStorage.setItem('loggedInUser', JSON.stringify(response))
    } catch(exception) {
      dispatch(setNotification('Invalid username or password', 'errorMsg', '5000'))
    }
  }
}

export const resetUserInfo = () => {
  return dispatch => {
    dispatch(resetUser(initialState))
  }
}

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer