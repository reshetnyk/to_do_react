import { createContext } from 'react'

const FlashContext = createContext({
  messages: [],
  addMsg: () => {},
  removeMsg: () => {}
})

export default FlashContext
