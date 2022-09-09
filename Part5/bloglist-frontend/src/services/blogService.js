import axios from 'axios'
const baseUrl = '/api/blogs'

let globalToken = null

const setToken = async (newToken) => {
  globalToken = `bearer ${newToken}`
}

const getAll = async (token) => {
  const config = {
    headers: {
      'Authorization': `bearer ${token}` }
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
  const request = await axios.put(`${ baseUrl }/${ id }`, newObject, { headers: { 'Authorization': globalToken } })
  console.log('!!!', request.data)
  return request.data
}

const remove = async (id) => {
  const request = await axios.delete(`${ baseUrl }/${ id }`, { headers: { 'Authorization': globalToken } })
  return request
}


export default { getAll, create, update, setToken, remove }