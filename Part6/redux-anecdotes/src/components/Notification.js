import { connect } from 'react-redux'

const Notification = ({ message, dispatch }) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {message.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification