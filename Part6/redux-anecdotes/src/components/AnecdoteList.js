import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { changeMessage, messageVisibility } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterState = useSelector(state => state.filter)

  const dispatch = useDispatch()

  const vote = id => {
    dispatch(addVote(id))
    const textToDisplay = anecdotes.find(item => item.id === id)
    displayNotification(textToDisplay.content)
  }

  const displayNotification = messageContent => {
    dispatch(changeMessage(messageContent))
    dispatch(messageVisibility())

    setTimeout(() => {
      dispatch(messageVisibility())
    }, 3000)
  }

  const sortedByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const filtered = sortedByVotes.filter(item => {
    return filterState === 'ALL' ? item : item.content.toLowerCase().includes(filterState) }  )

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