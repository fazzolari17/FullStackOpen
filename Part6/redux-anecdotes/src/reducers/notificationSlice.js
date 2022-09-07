import { createSlice } from '@reduxjs/toolkit'

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
      return { ...state, isShowing: action.payload }
    }
  }
})

let timeoutId
export const setNotification = (message, displayTime) => {
  return async dispatch => {
    dispatch(changeMessage(message))
    dispatch(messageVisibility(true))

    if(typeof timeoutId === 'number') {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        dispatch(messageVisibility(false))
      }, displayTime)
    }

    timeoutId = setTimeout(() => {
      dispatch(messageVisibility(false))
    }, displayTime)

  }


}

export const { changeMessage, messageVisibility } = notificationSlice.actions
export default notificationSlice.reducer
