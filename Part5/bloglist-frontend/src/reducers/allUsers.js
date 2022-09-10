import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return state = action.payload
    },
    resetAllUsers(state, action) {
      return state = action.payload
    }
  }
})

export const fetchUsers = () => {
  return async dispatch => {
    const response = await userService.getAll()
    localStorage.setItem('allUsers', JSON.stringify(response))
    dispatch(setAllUsers(response))
  }
}



export const { setAllUsers, resetAllUsers } = allUsersSlice.actions
export default allUsersSlice.reducer