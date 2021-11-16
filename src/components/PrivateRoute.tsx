import React from 'react'
import useUser from '../hooks/useUser'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }): JSX.Element {
  const { loading, user } = useUser()
  if (loading) return <div>loading user</div>
  if (user) return children
  return <Navigate to='/login' />
}
