import { configureStore } from '@reduxjs/toolkit'
import notification from './reducers/notificationReducer'
import blogs from './reducers/blogPostListReducer'
import blogForm from './reducers/blogFormReducer'
import loginForm from './reducers/loginFormReducer'
import allUsers from './reducers/allUsers'
import user from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification,
    blogs,
    blogForm,
    loginForm,
    allUsers,
    user
  }
})

export default store