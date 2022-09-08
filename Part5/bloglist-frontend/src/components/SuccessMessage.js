import React from 'react'
import { useSelector } from 'react-redux'

function SuccessMessage() {
  const notification = useSelector(state => state.notification)

  return (
    <div className={notification.className}>
      <h3>{notification.message}</h3>
    </div>
  )
}

export default SuccessMessage