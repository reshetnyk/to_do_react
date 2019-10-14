import { createContext } from 'react'

const UserContext = createContext({
  isAuthenticated: false,
  email: null,
  setAuthenticated: () => {},
  setEmail: () => {}
})

export default UserContext
