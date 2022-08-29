import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogService'

function LoginForm({ setUser, setErrorMessage, setBlogs }) {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      console.log(user)
      blogService.setToken(user.token)
      localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.getAll(user.token).then(blogs => setBlogs(blogs))

      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

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

export default LoginForm