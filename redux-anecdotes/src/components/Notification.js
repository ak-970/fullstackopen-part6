import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const typeColors = {
    success : 'green',
    error : 'red',
    info : 'blue',
    default : 'gray'
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    color: typeColors[notification.type] || typeColors.default
  }

  return notification.message === '' ? '' : (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification