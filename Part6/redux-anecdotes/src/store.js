import { configureStore } from '@reduxjs/toolkit'
import addAnecdote from './reducers/anecdoteReducer'
import addVote from './reducers/anecdoteReducer'
import notificationMessage from './reducers/notificationReducer'


const store = configureStore({
  reducer: {
    anecdotes: addAnecdote,
    votes: addVote,
    message: notificationMessage
  }
})


export default store