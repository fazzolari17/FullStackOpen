const { response } = require('express')
const express = require('express')
const { token } = require('morgan')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const generateId = () => {
    const maxId = persons.length > 0 
    ? Math.max(...persons.map(n => n.id))
    : 0
    return maxId + 1
}

app.put('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const updatedNumber = request.body.number

    let updatedContactList = persons.map(person => {
        if(person.id === id) {
            return {...person, number: updatedNumber}
        } else {
            return person
        }
    })
    
    persons = updatedContactList 

    response.json(persons)
})


app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name) {
        console.log(body)
        return response.status(400).json({
            error: 'content missing'
        })
    } 

    let newPerson = {
        id: generateId(),
        name: body.name, 
        number: body.number
    }
    
    persons = persons.concat(newPerson)
    response.json(persons) 
    // console.log(persons)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

    response.json(person)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const people = persons.length
    const timeStamp = new Date()
    response.send(`<h4>Phonebook has info for ${people} people</h4>
    <h5>${timeStamp}</h5>`)
})


const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
