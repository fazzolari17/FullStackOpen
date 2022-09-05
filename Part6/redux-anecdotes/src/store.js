import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './reducers/anecdoteReducer'
import notificationMessage from './reducers/notificationReducer'
import filterSlice from './reducers/filterSlice'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice,
    message: notificationMessage,
    filter: filterSlice
  }
})


export default store