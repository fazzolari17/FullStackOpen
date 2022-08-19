const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')

// GET all from server
blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// GET specific item from server by ID
blogRouter.get('/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .then(blogPost => {
      if (blogPost) {
        response.json(blogPost)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// DELETE item from server by ID
blogRouter.delete('/:id', (request, response, next) => {
  Blog
    .findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// POST item to server
blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

// PUT update item on server
blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog
    .findByIdAndUpdate(request.params.id, updatedBlog, { edited: true })
    .then(updatedBlogPost => {
      response.json(updatedBlogPost)
    })
    .catch(error => next(error))

})

module.exports = blogRouter