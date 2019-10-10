import UserContext from '../../context/UserContext'
import { useState, useEffect } from 'react'

const UserProvider = ({ children }) => {
  const userState = {
    isAuthenticated: false,
    email: '',
    setEmail: (newEmail) => {
      window.localStorage.setItem('email', newEmail)
      setUser(prevState => {
        return { ...prevState, email: newEmail }
      })
    },

    setAuthenticated: (state) => {
      setUser(prevState => {
        return { ...prevState, isAuthenticated: state }
      })
    }
  }

  useEffect(() => {
    setUser(prevState => {
      return { ...prevState, email: window.localStorage.getItem('email') }
    })
  }, [])

  const [user, setUser] = useState(userState)

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserProvider
