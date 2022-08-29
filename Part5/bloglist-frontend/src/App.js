import './style.css'
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogService'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessage from './components/SuccessMessage'
import Togglable from './components/Togglable'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ newBlog, setNewBlog ] = useState({ title: '', author: '', url: '', added: false })


  useEffect(() => {
    const loggedInUserJSON = localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)

      blogService.setToken(user.token)

      blogService
        .getAll(user.token)
        .then(blogsFromServer => setBlogs( blogsFromServer ))
    }
  }, [ newBlog ])

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    setUser(null)

    setBlogs([])
  }

  const blogsMappedFromServer = blogs.map(blog =>
    <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs}/>
  )

  const sortedByLikes = blogsMappedFromServer.sort((a, b) => parseInt(b.props.blog.likes) - parseInt(a.props.blog.likes))

  return (
    <div>
      <h2>Blogs</h2>
      {errorMessage !== null && <ErrorMessage message={errorMessage}/>}
      {newBlog.added && <SuccessMessage newBlog={newBlog}/>}

      {user !== null &&
      <div className="userLoggedIn"><p>{user.name} is logged in</p>
        
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>}

      {user === null ?
        <Togglable buttonLabel={'Login'}>
          <LoginForm
            setUser={setUser}
            user={user}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            setBlogs={setBlogs}
          />
        </Togglable>

        :
        <Togglable buttonLabel={'New Blog'}>
          <BlogForm
            user={user}
            setUser={setUser}
            setNewBlog={setNewBlog}
            newBlog={newBlog}
            setBlogs={setBlogs}
          />
        </Togglable>}

      { sortedByLikes }
    </div>
  )
}

export default App
