import React from 'react'
import { useDispatch } from 'react-redux'
import { addTitle, addAuthor, addUrl } from '../reducers/blogFormReducer'

function BlogForm({ handleSubmit }) {
  const dispatch = useDispatch()

  return (

    <div className='blog_form'>
      <h3 className='blog_form_title' aria-label='add new blog' >Add New Blog</h3>
      <form onSubmit={handleSubmit}>
        <label className='label'>
          title
          <input className='form_fields' type='text' aria-label='blog title' data-cy='title_input'
            onChange={e => dispatch(addTitle(e.target.value))}>
          </input>
        </label><br/>
        <label className='form_fields_container'>
          author
          <input className='form_fields' type='text' aria-label='blog author' data-cy='author_input'
            onChange={e => dispatch(addAuthor(e.target.value))}></input>
        </label><br />
        <label>
          url
          <input className='form_fields' type='text' aria-label='blog url' data-cy='blog_url_input'
            onChange={e => dispatch(addUrl(e.target.value))}></input>
        </label><br />
        <button
          aria-label='submit button'
          type='submit'
          data-cy='add_blog_btn'
        >Add Blog</button>

      </form>
    </div>
  )
}

export default BlogForm