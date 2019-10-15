import UserContext from '../../context/UserContext'
import { useState, useEffect } from 'react'

const UserProvider = ({ children }) => {
  const [isLoading, setIsloading] = useState(true)

  const userState = {
    isAuthenticated: false,
    email: null,
    setEmail: (newEmail) => {
      window.localStorage.setItem('email', newEmail)
      setUser(prevState => {
        return { ...prevState, email: newEmail }
      })
    },

    deleteEmail: () => {
      window.localStorage.removeItem('email')
      setUser(prevState => {
        return { ...prevState, email: null }
      })
    },

    setAuthenticated: (state) => {
      setUser(prevState => {
        return { ...prevState, isAuthenticated: state }
      })
    }
  }

  useEffect(() => {
    if (isLoading) {
      setUser(prevState => {
        return { ...prevState, email: window.localStorage.getItem('email') }
      })
      setIsloading(false)
    }
  }, [])

  const [user, setUser] = useState(userState)

  if (isLoading) return <></>
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserProvider
