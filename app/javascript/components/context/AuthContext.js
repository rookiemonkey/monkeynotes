import React, { useState, useCallback, useEffect } from 'react';
import simplifiedFecth from '../utilities/simplifiedFetch';

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    (async () => {
      const response = await simplifiedFecth('/check', 'POST')
      if (!response.message.indexOf('Unauthorize')) return null

      setIsLoggedIn(true)
    })()
  }, [])

  const loggedIn = useCallback(() => setIsLoggedIn(true), [])
  const loggedOut = useCallback(() => setIsLoggedIn(false), [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, loggedIn, loggedOut }} >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider };