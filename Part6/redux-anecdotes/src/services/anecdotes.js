import axios from 'axios'
import { nanoid } from '@reduxjs/toolkit'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const update = async (id, object) => {
  const response = await axios.put(`${baseUrl}/${id}`, object)
  console.log(response)
  return response.data
}

const createNew = async (content) => {
  const object = { content, id: nanoid(), votes: 0 }
  const response = await axios.post(`${baseUrl}`, object)
  return response.data
}

export default { getAll, createNew, update }