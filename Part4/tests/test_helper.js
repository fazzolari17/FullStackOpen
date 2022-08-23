
const Blog = require('../models/blogSchema')

const initialblogs = [
  {
    title: 'First Test Blog',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Second Test',
    author: 'Jeff Bezos',
    url: 'https://www.google.com/',
    likes: 17
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Non Existing ID',
    author: 'Non Existent',
    url: 'https://www.NonExistent.com/',
    likes: 17
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialblogs,
  nonExistingId,
  blogsInDb

}