import React from 'react'

function ErrorMessage({ message }) {
  return (
    <div className="errorMsg">
      <h2>{message}</h2>
    </div>
  )
}

export default ErrorMessage