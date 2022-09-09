import React from 'react'
import { useDispatch } from 'react-redux'
import { setUsername, setPassword } from '../reducers/loginFormReducer'

function LoginForm({ handleLogin }) {
  const dispatch = useDispatch()

  return (
    <>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input
            type='text'
            name='username'
            id='username'
            onChange={e => dispatch(setUsername(e.target.value))}></input>
        </label>
        <br />
        <label>
          password
          <input
            type='password'
            name='password'
            id='password'
            onChange={e => dispatch(setPassword(e.target.value))}
          ></input>
        </label>
        <br/>
        <button data-cy='login_btn' aria-label='login button' type='submit'>Login</button>
      </form>
    </>
  )
}

export default LoginForm