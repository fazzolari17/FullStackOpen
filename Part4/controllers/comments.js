const commentsRouter = require('express').Router()
const Comment = require('../models/comments')
const Blog = require('../models/blog')

// Post comment to server/DB
commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blogId = request.params.id
  console.log(body)
  console.log(request)
  console.log(blogId)
  const blog = await Blog.findById(blogId)
  console.log(blog)

  const comment = new Comment({
    comment: body.comment,
    blogs: blog._id
  })

  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.status(201).json(comment)
})

module.exports = commentsRouter