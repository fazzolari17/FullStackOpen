import { useSelector } from 'react-redux'
import Blog from './Blog'
import { useParams } from 'react-router-dom'

const BlogList = ({ addLike, removeBlog }) => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const userId = useParams()
  console.log(userId.id)

  const sortedByLikes = [...blogs].sort((a,b) => parseInt(b.likes) - parseInt(a.likes))
  let filtered

  userId.id === undefined
    ? filtered = sortedByLikes.map(blog => blog)
    : filtered = sortedByLikes.filter(blog => blog.user.id === userId.id)

  const blogsMappedFromServer = filtered.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      user={user.name}
      handleLike={addLike}
      handleRemove={removeBlog}
      onUserPage={userId.id === undefined ? false : true}/>
  )

  return (
    <>
      {blogsMappedFromServer}
    </>
  )
}

export default BlogList