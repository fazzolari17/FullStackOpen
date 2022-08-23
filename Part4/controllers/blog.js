const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')

// GET all from server
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// GET specific item from server by ID
blogRouter.get('/:id', async (request, response, next) => {
  const blogPost = await Blog.findById(request.params.id)
  if (blogPost) {
    response.json(blogPost)
  } else {
    response.status(404).end()
  }
  // Blog
  //   .findById(request.params.id)
  //   .then(blogPost => {
  //     if (blogPost) {
  //       response.json(blogPost)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
})

// DELETE item from server by ID
blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

  // Blog
  //   .findByIdAndRemove(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })
  //   .catch(error => next(error))
})

// POST item to server
blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body.title || !body.url) {
    response.status(400).end()
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: !body.likes ? 0 : body.likes
    })

    await blog.save()

    response.status(201).json(blog)

    // blog
    //   .save()
    //   .then(result => {
    //     response.status(201).json(result)
    //   })
    //   .catch(error => next(error))
  }
})

// PUT update item on server
blogRouter.put('/:id', async (request, response, next) => {
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
  // Blog
  //   .findByIdAndUpdate(request.params.id, updatedBlog)
  //   .then(updatedBlogPost => {
  //     response.json(updatedBlogPost)
  //   })
  //   .catch(error => next(error))

})

module.exports = blogRouter