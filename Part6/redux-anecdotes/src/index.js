import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdoteReducer,
  notificationReducer
})
const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)