import { useState, useContext } from 'react'
import './index.css'
import { makeRequest } from '../../../utils/RequestUtils'
import FlashContext from '../../../context/FlashContext'

const PasswordForgotForm = () => {
  const [inputValue, setInputValue] = useState('a@a.a')
  const { setMessages } = useContext(FlashContext)


  const onFormSubmit = e => {
    e.preventDefault()
    makeRequest({
      url: 'http://localhost:3000/api/user_forgot_passwords',
      method: 'post',
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
          <label>Enter your email address and we will send you a link to reset your password.</label>
        </div>
        <div className='form-group'>
          <input className='form-control' type='email' placeholder='Email' name='email' value={inputValue} onChange={onInputChangeHandler} />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-success w-100'>Reset</button>
        </div>
      </form>
    </div>
  )
}

export default PasswordForgotForm
