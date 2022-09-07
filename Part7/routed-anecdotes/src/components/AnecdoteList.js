import { Link } from 'react-router-dom'
import Notification from './notification'
const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <h2>Anecdotes</h2>
    {notification.isVisible && <Notification message={notification.content}/>}

    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}>
          <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

export default AnecdoteList