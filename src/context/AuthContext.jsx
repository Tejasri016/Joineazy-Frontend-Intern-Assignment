import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('joineazy_user')) || null
    } catch {
      return null
    }
  })

  const login = selectedUser => {
    localStorage.setItem('joineazy_user', JSON.stringify(selectedUser))
    setUser(selectedUser)
  }

  const logout = () => {
    localStorage.removeItem('joineazy_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}