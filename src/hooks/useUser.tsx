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
}

export default function useUser(): UserHook {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  function logout() {
    cookies.remove('bken_user')
    setAuthenticated(false)
    setUser(null)
    navigate('/login')
  }

  useEffect(() => {
    const userCookie = cookies.get('bken_user')
    if (userCookie) {
      const user = JSON.parse(userCookie)
      if (user && user.id) {
        setUser(user)
        setAuthenticated(true)
        setLoading(false)
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  return { user, authenticated, loading, logout }
}
