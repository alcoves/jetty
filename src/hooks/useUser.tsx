import jwt from 'jwt-decode'
import cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  id: string
  iat: number
  exp: number
  email: string
  username: string
}

interface UserHook {
  user: User
  loading: boolean
  logout: () => void
  authenticated: boolean
  login: (token: string) => void
}

export default function useUser(): UserHook {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  function logout() {
    cookies.remove('token')
    setAuthenticated(false)
    setUser(null)
    navigate('/login')
  }

  function login(token: string) {
    cookies.set('token', token)
    navigate('/')
  }

  useEffect(() => {
    const jwtToken = cookies.get('token')
    if (jwtToken) {
      const user = jwt<User>(jwtToken)
      if (user && user.id) {
        if (Date.now() >= user.exp * 1000) {
          logout()
          setAuthenticated(false)
          setLoading(false)
        } else {
          setUser(user)
          setAuthenticated(true)
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  return { user, authenticated, loading, logout, login }
}

export function getUserSync(): any {
  const jwtToken = cookies.get('token')
  if (jwtToken) {
    const user = jwt<User>(jwtToken)
    if (Date.now() >= user.exp * 1000) {
      cookies.remove('token')
      window.location.replace('/login')
    } else {
      return { user }
    }
  }
  return null
}
