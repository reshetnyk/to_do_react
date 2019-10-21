import { makeRequest } from '../../../utils/RequestUtils'
import { useState, useContext } from 'react'
import Router from 'next/router'
import UserContext from '../../../context/UserContext'
import cn from 'classnames'
import FlashContext from '../../../context/FlashContext'
import Link from 'next/link'

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
    }).then(resp => {
      if (resp.ok) {
        resp.json().then(data => {
          setEmail(data.user.email)
          setAuthenticated(true)
          Router.push('/tasks')
        })
      } else {
        resp.json().then(data => {
          console.log(data)
          if (data.errors) {
            setErrors(data.errors)
          }
          if (data.flash) {
            setMessages(data.flash)
          }
          setAuthenticated(false)
        })
      }
      setPassInput('')
      setEmailInput('')
    })
  }

  const renderValidationErrors = () => {
    if (errors && errors.auth) {
      return errors.auth.map((error, i) => <div className='invalid-feedback' key={i}>{error}</div>)
    }
  }

  const clearErrors = () => {
    if (errors && errors.auth) setErrors({})
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
        <div className='d-inline-block'>
          <div>
            <Link href='/users/password_forgot'>
              <a>Forgot password?</a>
            </Link>
          </div>
          <div>
            <Link href='/users/resend_confirmation'>
              <a>Didn't receive confirmation instructions?</a>
            </Link>
          </div>
        </div>
        <button type='submit' className='btn btn-primary float-right'>Sign in</button>
      </form>
    </div>
  )
}

export default Form
