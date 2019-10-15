import { makeRequest } from '../../../utils/RequestUtils'
import { useState, useContext } from 'react'
import Router from 'next/router'
import UserContext from '../../../context/UserContext'
import cn from 'classnames'
import FlashContext from '../../../context/FlashContext'

const Form = () => {
  const [emailInput, setEmailInput] = useState('')
  const [passInput, setPassInput] = useState('')
  const [errors, setErrors] = useState([])
  const { setAuthenticated, setEmail } = useContext(UserContext)
  const { setMessages } = useContext(FlashContext)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    makeRequest({
      url: 'http://localhost:3000/api/sessions',
      method: 'post',
      data: {
        email: emailInput,
        password: passInput
      }
    }).then(response => {
      if (response.ok) {
        setEmail(response.user.email)
        setAuthenticated(true)
        Router.push('/tasks')
      } else {
        setErrors(response.errors)
        if (response.flash) {
          setMessages(response.flash)
        }
        setAuthenticated(false)
        setPassInput('')
        setEmailInput('')
      }
    })
  }

  const renderValidationErrors = () => {
    if (errors && errors.auth) {
      return errors.auth.map((error, i) => <div className='invalid-feedback' key={i}>{error}</div>)
    }
  }

  const clearErrors = () => {
    if (errors.auth) setErrors({})
  }

  const onInputChangeHandler = (e, setFunc) => {
    setFunc(e.target.value)
    clearErrors()
  }

  const inputStyles = cn('form-control', { 'is-invalid': errors && errors.auth })

  return (
    <div className='row justify-content-center'>
      <form onSubmit={onSubmitHandler} className='col-8'>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            className={inputStyles}
            id='email'
            placeholder='Enter email'
            value={emailInput}
            onChange={(e) => onInputChangeHandler(e, setEmailInput)}
          />
          {renderValidationErrors()}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className={inputStyles}
            id='password'
            placeholder='Password'
            value={passInput}
            onChange={(e) => onInputChangeHandler(e, setPassInput)}
          />
        </div>
        <button type='submit' className='btn btn-primary float-right'>Sign in</button>
      </form>
    </div>
  )
}

export default Form
