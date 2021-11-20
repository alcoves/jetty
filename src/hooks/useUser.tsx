import jwt from 'jwt-decode'
import cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  id: string
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
    cookies.remove('user')
    setAuthenticated(false)
    setUser(null)
    navigate('/login')
  }

  function login(token: string) {
    const user = jwt(token)
    cookies.set('user', JSON.stringify(user))
    navigate('/')
  }

  useEffect(() => {
    const cookieUser = cookies.get('user')
    if (cookieUser) {
      const user = JSON.parse(cookieUser)
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
  const cookieUser = cookies.get('user')

  if (cookieUser) {
    const user = JSON.parse(cookieUser)
    if (Date.now() >= user.exp * 1000) {
      cookies.remove('user')
      window.location.replace('/login')
    } else {
      return { user }
    }
  }
  return null
}
