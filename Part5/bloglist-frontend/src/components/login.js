import React from "react"

function loginForm() {
  return (
    <>
    <form>
      <label>
        username
        <input type='text' name='username'></input>
      </label>
      <br />
      <label>
        password
        <input type='password' name='password'></input>
      </label>
      <br/>
      <button type='submit'>Login</button>
    </form>
    </>
  )
}

export default loginForm