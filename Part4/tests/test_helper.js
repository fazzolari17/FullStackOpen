const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUser = [
  {
    username: 'root',
    name: 'superuser',
    password: 'superuserPassword'
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialblogs,
  initialUser,
  nonExistingId,
  blogsInDb,
  usersInDb

}