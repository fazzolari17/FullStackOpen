import axios from 'axios'
const baseUrl = '/api/blogs'

let globalToken = null
let config = {
  headers: {
    'Authorization':  globalToken }
}

const setToken = (newToken) => {
  globalToken = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: {
      'Authorization':  globalToken }
  }
  const request = await axios.get(baseUrl, config)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: globalToken }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: {
      'Authorization':  globalToken }
  }
  const request = await axios.put(`${ baseUrl }/${ id }`, newObject, config )
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: {
      'Authorization':  globalToken }
  }
  const request = await axios.delete(`${ baseUrl }/${ id }`, config )
  return request
}

const createComment = async ({ blogId, comment }) => {
  const config = {
    headers: { Authorization: globalToken }
  }
  const response = await axios.post(`/api/blogs/${ blogId }/comments`, { blogId, comment }, config)
  return response.data
}


export default { getAll, create, update, setToken, remove, createComment }