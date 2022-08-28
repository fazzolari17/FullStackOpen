import React from "react"
import loginService from '../services/login'
import blogService from "../services/blogService"

function loginForm(props) {
const { setUsername, setPassword, setUser, setErrorMessage, username, password, user, setBlogs } = props
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService
        .getAll(user.token)
        .then(blogsFromServer => setBlogs( blogsFromServer ))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log(user)
  }


  return (
    <>
    <form onSubmit={handleLogin}>
      <label>
        username
        <input 
          type='text' 
          name='username'
          value={username}
          onChange={e => setUsername(e.target.value)}></input>
      </label>
      <br />
      <label>
        password
        <input 
          type='password' 
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
      </label>
      <br/>
      <button type='submit'>Login</button>
    </form>
    </>
  )
}

export default loginForm