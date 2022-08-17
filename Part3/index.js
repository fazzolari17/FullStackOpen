require('dotenv').config()
const { response } = require('express')
const express = require('express')
const { token } = require('morgan')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

// app.use(express.static('build'))
app.use(express.json())
// app.use(requestLogger)
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    const contact = {
        name: name, 
        number: number
    }

    Contact
      .findByIdAndUpdate(
        request.params.id, 
        { number: number }, 
        { runValidators:true, context: 'query' }
      )
      .then(updatedContact => {
        response.json(updatedContact)
      })
      .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if(!body.name) {
        return response.status(400).json({ error: 'content missing' })
    } 

    const contact = new Contact({
        name: body.name, 
        number: body.number
    })
  
    contact
      .save()
      .then(newContact => {
        response.json(newContact)
      })
      .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
    Contact
      .findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Contact
      .findById(request.params.id)
      .then(contact => {
        if (contact) {
            response.json(contact)
        } else {
            response.status(404).end()
        }
      })
      .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
    Contact
      .find({})
      .then(contacts => {
        response.json(contacts)
      })
      .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    const timeStamp = new Date()
    Contact
      .find({})
      .count()
      .then(count => {
        response.send(`<h4>Phonebook has info for ${count} people</h4>
        <h5>${timeStamp}</h5>`)
      })
      .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
