import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdoteReducer)
  console.log(anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  const sortedByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const anecdotesMapped = sortedByVotes.map(anecdote =>
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