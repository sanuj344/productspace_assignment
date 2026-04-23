import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(true)

  // Verify token on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }
    authService
      .getMe()
      .then(({ data }) => {
        setUser(data.data.user)
        localStorage.setItem('user', JSON.stringify(data.data.user))
      })
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (credentials) => {
    const { data } = await authService.login(credentials)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.data.user))
    setUser(data.data.user)
    return data
  }, [])

  const signup = useCallback(async (payload) => {
    const { data } = await authService.signup(payload)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.data.user))
    setUser(data.data.user)
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
