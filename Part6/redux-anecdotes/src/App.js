
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeState } from './reducers/anecdoteSlice'
import { useEffect } from 'react'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeState())
  }, [dispatch])

  const isVisible = useSelector(state => state.message.isShowing)

  return (
    <div>
      <h2>Anecdotes</h2>
      { isVisible && <Notification />}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App