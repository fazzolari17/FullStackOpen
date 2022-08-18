const blogRouter = require('express').Router()
const Blog = require('../models/blogs')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.get('/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end
      }
    })
    .catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
  const body = request.body

  const blogPost = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blogPost
    .save()
    .then(savedPost => {
      response.json(savedPost)
    })
    .catch(error => next(error))
})

blogRouter.delete('/:id', (request, response, next) => {
  Blog
    .findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const updatedPost = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog
    .findByIdAndUpdate(request.params.id, updatedPost, { edited: true })
    .then(updatedPost => {
      response.json(updatedPost)
    })
    .catch(error => next(error))
})

module.exports = blogRouter