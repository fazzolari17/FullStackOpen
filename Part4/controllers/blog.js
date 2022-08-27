const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')
const User = require('../models/user')

// GET all from server
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', 'username name')
  response.json(blogs)
})

// GET specific item from server by ID
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.path.substring(1))
  console.log('USER REQ', request.user, blog)

  if (blog === null) {
    response.status(404).send({
      error: 'no such blogPost exists'
    })
  } else if (request.user === blog.user.toString()) {
    response.status(200).send(blog)
  }

})

// DELETE item from server by ID
blogRouter.delete('/:id', async (request, response) => {
  const userId = request.user

  const blog = await Blog.findById(request.params.id)
  if (blog === null) {
    return response.status(404).send({
      error: 'no such blogPost exists'
    })
  } else if (userId === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
  } else if (userId !== blog.user.toString()) {
    return response.status(401).json({ error: 'note can only be delete by the user that created it' })
  }
  response.status(204).end()

})

// POST item to server
blogRouter.post('/', async (request, response) => {
  const body = request.body
  const userId = request.user

  const user = await User.findById(userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: !body.likes ? 0 : body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blog = user.blog.concat(savedBlog._id)
  await user.save()

  response.status(201).json(blog)

})

// PUT update item on server
blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    edited: true
  }

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog)

  response.json(updatedBlog)

})

module.exports = blogRouter