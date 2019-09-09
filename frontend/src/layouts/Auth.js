import React, { createContext, useState, useEffect, useContext } from 'react'
import { app } from '../feathers'

const AuthContext = createContext(null)

export const useUser = () => {
  return useContext(AuthContext)
}

const Auth = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async () => {
    let response
    try {
      response = await app.reAuthenticate()
    } catch (error) {
      response = await app.authenticate({ strategy: 'anonymous' })
    } finally {
      setUser(response.user)
    }
  }

  useEffect(() => {
    login()
  }, [])
  if (!user) return null
  return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>
}

export default Auth
