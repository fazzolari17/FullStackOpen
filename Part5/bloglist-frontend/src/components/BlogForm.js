import React from 'react'
import { useDispatch } from 'react-redux'
import { addTitle, addAuthor, addUrl } from '../reducers/blogFormReducer'

function BlogForm({ handleSubmit }) {
  const dispatch = useDispatch()

  return (

    <div>
      <h3 aria-label='add new blog' >Add New Blog</h3>
      <form onSubmit={handleSubmit}>
        <label>
          title
          <input type='text' aria-label='blog title' data-cy='title_input'
            onChange={e => dispatch(addTitle(e.target.value))}>
          </input>
        </label><br/>
        <label>
          author
          <input type='text' aria-label='blog author' data-cy='author_input'
            onChange={e => dispatch(addAuthor(e.target.value))}></input>
        </label><br />
        <label>
          url
          <input type='text' aria-label='blog url' data-cy='blog_url_input'
            onChange={e => dispatch(addUrl(e.target.value))}></input>
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