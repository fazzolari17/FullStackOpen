import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [ visible, setVisible ] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <section data-testid={'blog'} className='blog' style={blogStyle}>
      <p>
        <span aria-label='title'>{blog.title}</span>
        <span aria-label='author'>{blog.author}</span>
        <button className='showBtn' onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
      </p>
      <div data-testid={'hidden'} style={Object.assign(showWhenVisible)}>
        <p>
          <a aria-label='url' href={`https://${blog.url}`} target='blank'>{blog.url}</a>
          <span aria-label='likes'>Likes: {blog.likes}</span>
          <button onClick={() => handleLike(blog.id)}>Like</button>
        </p>
        <p aria-label='username'>{blog.user.name}</p>
        <button onClick={() => handleRemove(blog.id)}>Remove</button>
      </div>

    </section>


  )
}

export default Blog