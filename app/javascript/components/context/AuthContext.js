import React, { useState, useCallback, useEffect } from 'react';
import getCookieValue from '../utilities/getCookieValueValue';

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = getCookieValue('auth')
    if (token) setIsLoggedIn(true)
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