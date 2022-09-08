import './style.css'
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogService'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessage from './components/SuccessMessage'
import Togglable from './components/Togglable'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ newBlog, setNewBlog ] = useState({ title: '', author: '', url: '' }) //, added: false
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const blogFormRef = useRef()
  const dispatch = useDispatch()


  useEffect(() => {
    //Get Authentication token from local storage
    const loggedInUserJSON = localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)

      blogService.setToken(user.token)

      blogService
        .getAll(user.token)
        .then(blogsFromServer => setBlogs( blogsFromServer ))
    }
  }, [ newBlog.added ])

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    setUser(null)

    setBlogs([])
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    event.target.reset()

    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      blogService.setToken(user.token)
      localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.getAll(user.token).then(blogs => setBlogs(blogs))

      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = e => {
    e.preventDefault()
    e.target.reset()

    dispatch(setNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, 'successMsg', '5000'))
    blogFormRef.current.toggleVisibility()
    blogService.create(newBlog)
    setNewBlog({ ...newBlog, added: true })

    setTimeout(() => {
      setNewBlog({ title: '', author: '', url: '', added: false })
    }, 3000)
  }

  const removeBlog = async (id) => {
    const blog = blogs.filter(blog => blog.id === id)

    if(window.confirm(`Remove ${blog[0].title} by ${blog[0].author}`) === false) {
      return
    }

    await blogService.remove(blog[0].id)
    const blogsFromDb = await blogService.getAll(user.token)
    setBlogs(blogsFromDb)
  }

  const addLike = async (id) => {
    const blog = blogs.filter(blog => blog.id === id)

    blogService.update(id, {
      ...blog[0],
      likes: parseInt(blog[0].likes) + 1
    })
    const fromDb = await blogService
      .getAll(user.token)

    setBlogs(fromDb)
  }

  const blogsMappedFromServer = blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      user={user}
      setBlogs={setBlogs}
      handleLike={addLike}
      handleRemove={removeBlog}/>
  )

  const sortedByLikes = blogsMappedFromServer.sort((a, b) => parseInt(b.props.blog.likes) - parseInt(a.props.blog.likes))

  return (
    <div>
      <h2>Blogs</h2>
      {/* Error and Success Messages for  */}
      {errorMessage !== null && <ErrorMessage message={errorMessage}/>}
      {newBlog.added && <SuccessMessage newBlog={newBlog}/>}

      {user !== null && <div className="userLoggedIn"><p>{user.name} is logged in</p>
        <button data-cy='logout_btn' onClick={logout}>Logout</button>
      </div>}

      {user === null &&
        <Togglable visible={true} buttonId={'login_cancel_btn'} buttonLabel={'Login'}>
          <LoginForm
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>}
      { user !== null &&
        <Togglable visible={false} buttonId={'new_blog_button'} buttonLabel={'New Blog'} ref={blogFormRef}>
          <BlogForm
            setNewBlog={setNewBlog}
            handleSubmit={addBlog}
          />
        </Togglable>}

      { sortedByLikes }
    </div>
  )
}

export default App
