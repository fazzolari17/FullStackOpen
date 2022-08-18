require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Blog = require('./models/blog')
const blogRouter = require('./controllers/blog')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

module.exports = app
