
const Notification = ({ message }) => {

  const style = {
    border: '1ps solid 000'
  }
  return (
    <div style={style}>
      a new anecdote {message} created!
    </div>
  )
}

export default Notification