import './style.css'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import blogService from './services/blogService'
import BlogList from './components/BlogList'
import SingleBlog from './components/SingleBlog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'

import { setNotification } from './reducers/notificationReducer'
import { toggleAdded } from './reducers/blogFormReducer'
import { resetLoginForm } from './reducers/loginFormReducer'
import { login, resetUserInfo, setUser } from './reducers/userReducer'
import { initializeState, removeAllBlogs, createNew, removeBlogFromState, addLikes, addComments } from './reducers/blogPostListReducer'
import { fetchUsers, resetAllUsers, setAllUsers } from './reducers/allUsers'

const App = () => {
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const blogForm = useSelector(state => state.blogForm)
  const loginForm = useSelector(state => state.loginForm)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    //Get Authentication token from local storage
    const allUsersJSON = localStorage.getItem('allUsers')
    const loggedInUserJSON = localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      const allUsers = JSON.parse(allUsersJSON)
      console.log(user.token)
      blogService.setToken(user.token)

      dispatch(setUser(user))
      dispatch(setAllUsers(allUsers))
      dispatch(initializeState(user.token))
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('allUsers')
    dispatch(resetUserInfo())
    dispatch(removeAllBlogs())
    dispatch(resetAllUsers([]))
    navigate('/')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    event.target.reset()
    dispatch(login(loginForm.username, loginForm.password))
    dispatch(resetLoginForm())
    dispatch(fetchUsers())
    navigate('/users')

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
    navigate('/blogs')

  }

  const addLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)

    const blogWithAddedLike =  {
      ...blog, likes: parseInt(blog.likes) + 1
    }

    dispatch(addLikes(id, blogWithAddedLike))
    dispatch(initializeState(user.token))
  }

  const addComment = newComment => {
    dispatch(addComments(user.token, newComment))
  }

  const padding = {
    paddingLeft: '.5rem',
    color: '#F7F0F0'
  }

  return (
    <div>
      <nav className='navBar'>
        <Link style={padding} to='/'>Home</Link>
        <Link style={padding} to='/blogs'>Blogs</Link>
        <Link style={padding} to='/users'>Users</Link>
        <Link style={padding} to='/login'>Login</Link>
        {user !== null && <div className="userLoggedIn"><p>{user.name} is logged in</p>
          <button data-cy='logout_btn' id='logout_btn' onClick={logout}>Logout</button>
        </div>}
      </nav>
      {notification.isVisible && <Notification />}
      <Routes>

        <Route path='/' element={<h1>Home</h1>}/>

        <Route path='/login' element={
          <Togglable classname={'loginToggle'} visible={true} buttonId={'login_cancel_btn'} buttonLabel={'Login'}>
            <LoginForm handleLogin={handleLogin} />
          </Togglable>} />

        <Route
          path='/users/:id'
          element={
            <div>
              <h4 style={{ margin: '1rem' }}>added Blogs</h4>
              <BlogList addLike={addLike} removeBlog={removeBlog} />
            </div>
          } />

        <Route path='/users' element={<Users />} />

        <Route path ='/blogs/:id' element={
          <SingleBlog  handleLike={addLike} handleRemove={removeBlog} handleComment={addComment}/>
        } />

        <Route path='/blogs' element={
          <div>
            <h2 style={{ margin: '1rem' }} >Blogs</h2>
            <Togglable visible={false} buttonId={'new_blog_button'} buttonLabel={'New Blog'} ref={blogFormRef}>
              <BlogForm handleSubmit={addBlog} />
            </Togglable>
            <BlogList addLike={addLike} removeBlog={removeBlog} />
          </div>} />

      </Routes>
    </div>
  )
}

export default App
