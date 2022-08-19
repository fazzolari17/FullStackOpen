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
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)