import { useState } from 'react'
import FlashContext from '../../context/FlashContext'

const FlashProvider = ({ children }) => {
  const userState = {
    messages: [],
    setMessages: (messages) => {
      setFlash(prevState => {
        return { ...prevState, messages: messages }
      })
    },
    removeMsg: () => {}
  }

  const [flash, setFlash] = useState(userState)

  const renderFlash = () => {
    return flash.messages.map((f, i) => (
      <div className={'text-center  alert alert-' + f.type + ' alert-dismissible fade show'} role='alert' key={i}>
        {f.msg}
        <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    ))
  }

  return (
    <FlashContext.Provider value={flash}>
      {renderFlash()}
      {children}
    </FlashContext.Provider>
  )
}

export default FlashProvider
