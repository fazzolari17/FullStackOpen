const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Must have a Title']
  },
  author: {
    type: String,
    required: [true, 'Must have an author']
  },
  url: {
    type: String,
    required: [true, 'Url is required']
  },
  likes:{
    type: String,
  },
  edited: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog