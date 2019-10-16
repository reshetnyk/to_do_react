import { useState } from 'react'
import FlashContext from '../../context/FlashContext'

/*
* message { msg:'str', type:'bootstrap-message-type'}
* */
const FlashProvider = ({ children }) => {
  const flashState = {
    messages: [],
    setMessages: (messages) => {
      setFlash({ ...flash, messages })
    },
    addMessage: (message) => {
      setFlash({ ...flash, messages: [...flash.messages, message] })
    },
    removeMsg: (index) => {
      const messages = flash.messages.splice(index, 1)
      setFlash({ ...flash, messages })
    },
    removeAllMsg: () => {
      setFlash({ ...flash, messages: [] })
    }
  }

  const [flash, setFlash] = useState(flashState)

  const renderFlash = () => {
    return flash.messages.map((f, i) => (
      <div className={'text-center  alert alert-' + f.type + ' alert-dismissible fade show'} role='alert' key={i}>
        {f.msg}
        <button type='button' className='close' data-dismiss='alert' aria-label='Close' onClick={(i) => flash.removeMsg(i)}>
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
