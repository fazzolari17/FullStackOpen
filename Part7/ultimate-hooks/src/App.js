import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

const useResource = (baseUrl, content) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(r => setResources( prev => r.data )) 
  }, [ baseUrl, setResources ])
  
  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }
  
  const create = async (content) => {
    const newObject = content 
    const response = await axios.post(baseUrl, newObject)

    // called to update the page with newly created item
    const getResponse = await axios.get(baseUrl)
    setResources(getResponse.data)

    return response.data
  }
  
  const service = {
    getAll,
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.onReset()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.onReset()
    number.onReset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App