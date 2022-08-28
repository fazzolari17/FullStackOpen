import './style.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogService'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessage from './components/SuccessMessage'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ newBlog, setNewBlog ] = useState({title: '', author: '', url: '', added: false})



  // useEffect(() => {
  //   blogService.getAll().then(blogsFromServer =>
  //     setBlogs( blogsFromServer )
  //   )  
  //   console.log(user)
  // }, [newBlog])

  useEffect(() => {
    
    const loggedInUserJSON = localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user.token)
      
      blogService
        .getAll(user.token)
        .then(blogsFromServer => setBlogs( blogsFromServer ))
    }
  }, [newBlog])
  
  const blogsMapped = blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )

  return (
    <div>
      <h2>Blogs</h2>
      {errorMessage !== null && <ErrorMessage message={errorMessage}/>}
      {newBlog.added && <SuccessMessage newBlog={newBlog}/>}
      {user === null ?
        <LoginForm 
        setPassword={setPassword}
        password={password}
        setUsername={setUsername}
        username={username}
        setUser={setUser}
        user={user}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
        setBlogs={setBlogs}
        /> 
        : <BlogForm 
        user={user}
        setUser={setUser}
        setNewBlog={setNewBlog}
        newBlog={newBlog}
        setBlogs={setBlogs}
        />
      }

      {blogsMapped}
    </div>
  )
}

export default App
