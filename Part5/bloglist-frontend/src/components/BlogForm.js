import React, { useState } from 'react'
import blogService from '../services/blogService'

function BlogForm({ user, setUser, setNewBlog, newBlog, setBlogs }) {
  const [ visible, setVisible ] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const addBlog = (event) => {
    event.preventDefault()
    event.target.reset()

    blogService.create(newBlog)
    setNewBlog({ ...newBlog, added: true })

    setVisible(false)

    setTimeout(() => {
      setNewBlog({ title: '', author: '', url: '', added: false })
    }, 3000)


  }

  return (

    <div>
        <h3>Add New Blog</h3>
        <form onSubmit={addBlog}>
          <label>
            title
            <input type='text'
              value={newBlog.title}
              onChange={e => setNewBlog(prev => prev = { ...prev, title: e.target.value })}></input>
          </label><br/>
          <label>
            author
            <input type='text'
              value={newBlog.author}
              onChange={e => setNewBlog(prev => prev = { ...prev, author: e.target.value })}></input>
          </label><br />
          <label>
            url
            <input type='text'
              value={newBlog.url}
              onChange={e => setNewBlog(prev => prev = { ...prev, url: e.target.value })}></input>
          </label><br />
          <button type='submit'>Add Blog</button>

        </form>
    </div>
  )
}

export default BlogForm