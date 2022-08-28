import React from 'react'
import blogService from '../services/blogService'

function BlogForm({ user, setUser, setNewBlog, newBlog, setBlogs }) {

  const addBlog = (event) => {
    event.preventDefault()
    event.target.reset()

    blogService.create(newBlog)
    setNewBlog({...newBlog, added: true })

    setTimeout(() => {
      setNewBlog({ title: '', author: '', url: '', added: false })
    }, 5000)


  }

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    setUser(null)

    setBlogs([])
  }

  return (
    
    <>
      {user !== null && 
      <div className="userLoggedIn"><p>{user.name} is logged in</p>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>}

      <h3>Add New Blog</h3>
      <form onSubmit={addBlog}>
        <label>
          title
          <input type='text' 
            value={newBlog.title}
            onChange={e => setNewBlog(prev => prev = { ...prev, title: e.target.value})}></input>
        </label><br/>
        <label>
          author
          <input type='text'
            value={newBlog.author}
            onChange={e => setNewBlog(prev => prev = {...prev, author: e.target.value})}></input>
        </label><br />
        <label>
          url
          <input type='text'
            value={newBlog.url}
            onChange={e => setNewBlog(prev => prev = {...prev, url: e.target.value})}></input>
        </label><br />
        <button type='submit'>Add Blog</button>

      </form>
    </>
  )
}

export default BlogForm