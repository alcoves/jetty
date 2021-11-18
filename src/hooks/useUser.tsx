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
}

export default function useUser(): UserHook {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  function logout() {
    localStorage.removeItem('user')
    setAuthenticated(false)
    setUser(null)
    navigate('/login')
  }

  useEffect(() => {
    const localStorageUser = localStorage.getItem('user')
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser)
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

  return { user, authenticated, loading, logout }
}

export function getUserSync(): any {
  const localStorageUser = localStorage.getItem('user')

  if (localStorageUser) {
    const user = JSON.parse(localStorageUser)
    if (Date.now() >= user.exp * 1000) {
      window.location.replace('/login')
    } else {
      return { user }
    }
  }
  return null
}
