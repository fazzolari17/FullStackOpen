import React from 'react'

function BlogForm({ setNewBlog, handleSubmit }) {

  return (

    <div>
      <h3 aria-label='add new blog' >Add New Blog</h3>
      <form onSubmit={handleSubmit}>
        <label>
          title
          <input type='text' aria-label='blog title' data-cy='title_input'
            onChange={e => setNewBlog(prev => prev = { ...prev, title: e.target.value })}>
          </input>
        </label><br/>
        <label>
          author
          <input type='text' aria-label='blog author' data-cy='author_input'
            onChange={e => setNewBlog(prev => prev = { ...prev, author: e.target.value })}></input>
        </label><br />
        <label>
          url
          <input type='text' aria-label='blog url' data-cy='blog_url_input'
            onChange={e => setNewBlog(prev => prev = { ...prev, url: e.target.value })}></input>
        </label><br />
        <button
          role='submit'
          aria-label='submit button'
          type='submit'
          data-cy='add_blog_btn'
        >Add Blog</button>

      </form>
    </div>
  )
}

export default BlogForm