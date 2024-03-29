import React from 'react'
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteSlice'
import { setNotification } from '../reducers/notificationSlice'



const AnecdoteForm = ({ dispatch }) => {

  const create = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    dispatch(createNew(content))
    dispatch(setNotification(`you added ${content}`, 5000))
    e.target.reset()
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


const ConnectedAnecdoteForm = connect()(AnecdoteForm)
export default ConnectedAnecdoteForm