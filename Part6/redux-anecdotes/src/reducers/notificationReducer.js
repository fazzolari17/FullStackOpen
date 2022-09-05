import { createAction, createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const initialState = {
  message: 'Reverted to previous commit to fix this',
  isShowing: false
}

const notificationSlice = createSlice({
  name:'message',
  initialState,
  reducers: {
    changeMessage(state, action) {
      return { ...state, message: action.payload }
    },
    messageVisibility(state, action) {
      return { ...state, isShowing: !state.isShowing }
    }
  }
})

export const { changeMessage, messageVisibility } = notificationSlice.actions
export default notificationSlice.reducer
