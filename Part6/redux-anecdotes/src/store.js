import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './reducers/anecdoteReducer'
import notificationMessage from './reducers/notificationReducer'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice,
    message: notificationMessage
  }
})


export default store