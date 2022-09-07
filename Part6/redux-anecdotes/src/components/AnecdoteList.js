import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteSlice'
import { setNotification } from '../reducers/notificationSlice'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterState = useSelector(state => state.filter)

  const dispatch = useDispatch()

  const vote = id => {
    const object = anecdotes.find(item => item.id === id)

    const updatedObject = {
      ...object,
      votes: object.votes + 1
    }

    dispatch(updateVotes(id, updatedObject))
    dispatch(setNotification(`you voted ${object.content}`, '5000'))
  }

  const sortedByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const filtered = sortedByVotes.filter(item => {
    return filterState === 'ALL'
      ? item
      : item.content.toLowerCase().includes(filterState) })

  const anecdotesMapped = filtered.map(anecdote =>
    (<div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>)
  )

  return (
    <>
      {anecdotesMapped}
    </>
  )
}

export default AnecdoteList