import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { changeMessage, messageVisibility } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()


  const create = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    dispatch(addAnecdote(content))
    displayNotification(content)
    e.target.reset()
  }

  const displayNotification = messageContent => {
    dispatch(changeMessage(messageContent))
    dispatch(messageVisibility())

    setTimeout(() => {
      dispatch(messageVisibility())
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm