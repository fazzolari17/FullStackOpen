import React from 'react'

function LoginForm({ handleLogin, setPassword, setUsername }) {

  return (
    <>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input
            type='text'
            name='username'
            onChange={e => setUsername(e.target.value)}></input>
        </label>
        <br />
        <label>
          password
          <input
            type='password'
            name='password'
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