import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user)

  if (user) return children

  return <Navigate to='/#target-login' />
}

export default PrivateRoute
