import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './reducers/anecdoteSlice'
import notificationMessage from './reducers/notificationSlice'
import filterSlice from './reducers/filterSlice'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice,
    message: notificationMessage,
    filter: filterSlice
  }
})


export default store