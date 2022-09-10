import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLike, handleRemove, onUserPage }) => {
  const [ visible, setVisible ] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  // updates style based on page
  let blogStyle
  onUserPage
    ? blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      marginBottom: 5
    }
    : blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  if(onUserPage) {
    return (
      <section data-testid={'blog'} className='blog' style={blogStyle}>
        <li>
          {blog.title}
        </li>
      </section>
    )
  } else {
    return (
      <div style={blogStyle} >
        <Link to={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link>
      </div>
    )
  }

}

export default Blog