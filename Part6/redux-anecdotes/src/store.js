import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import addAnecdote from './reducers/anecdoteReducer'
import addVote from './reducers/anecdoteReducer'
import notificationMessage from './reducers/notificationReducer'

const reducers = combineReducers({
  anecdotes: addAnecdote,
  votes: addVote,
  message: notificationMessage


})
const store = configureStore({ reducer: { reducers } })


export default store