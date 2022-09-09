import './style.css'
import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogService'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeState, removeAllBlogs, createNew, removeBlogFromState, addLikes, } from './reducers/blogPostListReducer'
import { toggleAdded } from './reducers/blogFormReducer'
import { resetLoginForm } from './reducers/loginFormReducer'
import { login, resetUserInfo, setUser } from './reducers/userReducer'

const App = () => {
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const blogForm = useSelector(state => state.blogForm)
  const loginForm = useSelector(state => state.loginForm)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    //Get Authentication token from local storage
    const loggedInUserJSON = localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))

      blogService.setToken(user.token)
      dispatch(initializeState(user.token))
    }
  }, [blogForm.added])

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    dispatch(resetUserInfo())
    dispatch(removeAllBlogs())
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    event.target.reset()

    dispatch(login(loginForm.username, loginForm.password))
    dispatch(resetLoginForm())
  }

  const addBlog = e => {
    e.preventDefault()
    e.target.reset()

    dispatch(setNotification(`A new blog ${blogForm.title} by ${blogForm.author} added`, 'successMsg', '5000'))
    blogFormRef.current.toggleVisibility()
    dispatch(createNew({ ...blogForm, user: user.name }))

    dispatch(toggleAdded('2000'))
  }

  const removeBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)

    if(window.confirm(`Remove ${blog.title} by ${blog.author}`) === false) {
      return
    }
    dispatch(removeBlogFromState(blog.id, user.token))
    dispatch(initializeState(user.token))

  }

  const addLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)

    const blogWithAddedLike =  {
      ...blog, likes: parseInt(blog.likes) + 1
    }

    dispatch(addLikes(id, blogWithAddedLike))
    dispatch(initializeState(user.token))
  }

  const blogsMappedFromServer = blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      user={user.name}
      handleLike={addLike}
      handleRemove={removeBlog}/>
  )

  const sortedByLikes = blogsMappedFromServer.sort((a, b) => parseInt(b.props.blog.likes) - parseInt(a.props.blog.likes))

  return (
    <div>
      <h2>Blogs</h2>
      {notification.isVisible && <Notification />}

      {user !== null && <div className="userLoggedIn"><p>{user.name} is logged in</p>
        <button data-cy='logout_btn' onClick={logout}>Logout</button>
      </div>}

      {user === null &&
        <Togglable visible={true} buttonId={'login_cancel_btn'} buttonLabel={'Login'}>
          <LoginForm handleLogin={handleLogin} />
        </Togglable>}
      { user !== null &&
        <Togglable visible={false} buttonId={'new_blog_button'} buttonLabel={'New Blog'} ref={blogFormRef}>
          <BlogForm handleSubmit={addBlog} />
        </Togglable>}

      { sortedByLikes }
    </div>
  )
}

export default App
