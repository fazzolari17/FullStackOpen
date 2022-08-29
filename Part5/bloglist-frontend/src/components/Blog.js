import React, { useState } from 'react'
import blogService from '../services/blogService'

const Blog = ({ blog, user, setBlogs }) => {
  const [ visible, setVisible ] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async () => {
    blogService.update(blog.id, {
      ...blog,
      likes: parseInt(blog.likes) + 1
    })
    const fromDb = await blogService
      .getAll(user.token)

    setBlogs(fromDb)
  }

  const removeBlog = async () => {
    if(window.confirm(`Remove ${blog.title} by ${blog.author}`) === false) {
      return
    }

    await blogService.remove(blog.id)
    const blogsFromDb = await blogService.getAll(user.token)
    setBlogs(blogsFromDb)
  }

  return (

    <div>
      <div style={Object.assign(hideWhenVisible, blogStyle)}>
        {blog.title} {blog.author}

        <div>
          <button onClick={() => setVisible(true)}>Show</button>
        </div>
      </div>


      <div style={Object.assign(showWhenVisible, blogStyle)}>
        {blog.title}
        {blog.author}
        <div>
          <button onClick={() => setVisible(false)}>Hide</button>
        </div><br/>
        <a href={`https://${blog.url}`} target='blank'>{blog.url}</a><br />
        Likes: {blog.likes}
        <button className='likeBtn' onClick={addLike} >like</button>
        <br/>
        {blog.user.name}



        <div>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>

    </div>
  )}

export default Blog