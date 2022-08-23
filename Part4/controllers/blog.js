const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')

// GET all from server
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// GET specific item from server by ID
blogRouter.get('/:id', async (request, response) => {
  const blogPost = await Blog.findById(request.params.id)

  if (blogPost) {
    response.json(blogPost)
  } else {
    response.status(404).end()
  }

})

// DELETE item from server by ID
blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})

// POST item to server
blogRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: !body.likes ? 0 : body.likes
  })

  await blog.save()

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