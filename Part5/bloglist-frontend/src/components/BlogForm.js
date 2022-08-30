import React from 'react'

function BlogForm({ setNewBlog,  addBlog }) {

  return (

    <div>
      <h3>Add New Blog</h3>
      <form onSubmit={addBlog}>
        <label>
          title
          <input type='text'
            onChange={e => setNewBlog(prev => prev = { ...prev, title: e.target.value })}></input>
        </label><br/>
        <label>
          author
          <input type='text'
            onChange={e => setNewBlog(prev => prev = { ...prev, author: e.target.value })}></input>
        </label><br />
        <label>
          url
          <input type='text'
            onChange={e => setNewBlog(prev => prev = { ...prev, url: e.target.value })}></input>
        </label><br />
        <button type='submit'>Add Blog</button>

      </form>
    </div>
  )
}

export default BlogForm