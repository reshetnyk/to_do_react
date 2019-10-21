import FlashContext from '../../../context/FlashContext'
import { makeRequest } from '../../../utils/RequestUtils'
import { useContext, useState } from 'react'
import './index.css'


const ResendConfirmationForm = () => {
  const [inputValue, setInputValue] = useState('')
  const { setMessages } = useContext(FlashContext)

  const onFormSubmit = e => {
    e.preventDefault()
    makeRequest({
      url: 'http://localhost:3000/api/user_resend_confirmations',
      method: 'put',
      data: { email: e.target.email.value }
    }).then(resp => {
      resp.json().then(data => {
        if (data.flash) {
          setMessages(data.flash)
        }
        setInputValue('')
      })
    })
  }
  const onInputChangeHandler = e => {
    setInputValue(e.target.value)
  }

  return (
    <div className='card p-4 form-wrap'>
      <form onSubmit={onFormSubmit} className=''>
        <div className='form-group'>
          <label>Enter your email address and we will send you a letter with confirmation instructions.</label>
        </div>
        <div className='form-group'>
          <input className='form-control' type='email' placeholder='Email' name='email' value={inputValue} onChange={onInputChangeHandler} />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-success w-100'>Resend</button>
        </div>
      </form>
    </div>
  )
}

export default ResendConfirmationForm
