import React, { createContext, useState, useEffect, useContext } from 'react'
import { app } from '../feathers'

const AuthContext = createContext(null)

export const useUser = () => {
  return useContext(AuthContext)
}

const Auth = ({ children }) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const authLogic = async () => {
      let response
      try {
        response = await app.reAuthenticate()
      } catch (error) {
        response = await app.authenticate({ strategy: 'anonymous' })
      } finally {
        setUser(response.user)
      }
    }
    authLogic()
  }, [])
  if (!user) return null
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export default Auth
