import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    handleNotification(content.value)
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate(`/`)
  }

  const handleReset = () => {
    content.onReset()
    author.onReset()
    info.onReset()
  }


  const handleNotification = content => {
    setNotification({ content: content, isVisible: true })

    setTimeout(() => {
      setNotification({ content: '', isVisible: false})
    }, 5000)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type="reset" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew