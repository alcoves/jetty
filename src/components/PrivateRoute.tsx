import React from 'react'
import useUser from '../hooks/useUser'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }: { children: any }): JSX.Element {
  const { loading, user } = useUser()
  if (loading) return null
  if (user) return children
  return <Navigate to='/login' />
}
