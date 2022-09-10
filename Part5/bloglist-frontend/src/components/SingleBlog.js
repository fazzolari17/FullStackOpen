import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SingleBlog = ({ handleLike, handleRemove }) => {
  const blogs = useSelector(state => state.blogs)
  const blogId = useParams()
  const user = useSelector(state => state.user)
  // Fixes crash when refreshing page that is on a single blog
  if(blogs.length < 1) {
    return null
  }

  const blog = blogs.find(blog => blog.id === blogId.id)

  return (
    <div className='sb_main_container'>
      <h2 className='sb_title'>{`${blog.title} ${blog.author}`}</h2>
      <a className='sb_url' href={`https://${blog.url}`} target='blank'>{`https://${blog.url}`}</a>
      <div className='sb_likes_container'>
        <p>{blog.likes} Likes</p><button onClick={e => handleLike(blog.id)}>Like</button>
      </div>
      <p>Added By: {blog.user.username}</p>
      {/* Conditionally render Remove Btn  */}
      {user.name === blog.user.name && <button onClick={e => handleRemove(blog.id)}>Remove</button>}
    </div>
  )
}

export default SingleBlog