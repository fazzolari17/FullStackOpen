
const initialState = {
  message: 'Reverted to previous commit to fix this',
  isShowing: false
}

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_MESSAGE':
    return { ...state, message: action.payload }
  case 'CHANGE_SHOW':
    return { ...state, isShowing: !state.isShowing }
  default:
    return state

  }
}

export const changeMessage = newMessage => {
  return {
    type: 'CHANGE_MESSAGE',
    payload: newMessage
  }
}

export const messageVisibility = () => {
  return {
    type: 'CHANGE_SHOW'

  }
}


// export const { changeMessage, messageVisibility }

export default NotificationReducer

// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   message: 'Inside State Finally',
//   isShowing: false
// }

// const options = {
//   name: 'notification',
//   initialState,
//   reducers: {
//     displayNotification(state, action) {
//       return { ...state, isShowing: !state.isShowing }
//     },
//     changeNotification(state, action) {
//       return { ...state, message: action.payload }
//     }
//   }
// }

// const notificationMessageSlice = createSlice(options)

// export const { displayNotification, changeNotification } = notificationMessageSlice.actions
// export default notificationMessageSlice