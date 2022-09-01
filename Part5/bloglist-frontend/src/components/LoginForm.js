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
            id='username'
            onChange={e => setUsername(e.target.value)}></input>
        </label>
        <br />
        <label>
          password
          <input
            type='password'
            name='password'
            id='password'
            onChange={e => setPassword(e.target.value)}
          ></input>
        </label>
        <br/>
        <button data-cy='login_btn' aria-label='login button' type='submit'>Login</button>
      </form>
    </>
  )
}

export default LoginForm