import { configureStore } from '@reduxjs/toolkit'
import notification from './reducers/notificationReducer'

import thunk from 'redux-thunk'
// import logger from 'redux-logger'


const store = configureStore({
  reducer: {
    notification,
    middleware: [thunk]
  }
})

export default store