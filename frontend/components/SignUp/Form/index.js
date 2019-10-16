import { makeRequest } from '../../../utils/RequestUtils'
import { useState } from 'react'
import Router from 'next/router'
import cn from 'classnames'

const Form = () => {
  const [emailInput, setEmailInput] = useState('olexandr.reshetnyk@gmail.com')
  const [passInput, setPassInput] = useState('qqqqqq')
  const [confirmPassInput, setConfirmPassInput] = useState('qqqqqq')
  const [errors, setErrors] = useState([])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    makeRequest({
      url: 'http://localhost:3000/api/users',
      method: 'post',
      data: {
        email: emailInput,
        password: passInput,
        password_confirmation: confirmPassInput
      }
    }).then(resp => {
      console.log(resp)
      if (resp.ok) {
        Router.push('/users/sign_in')
      } else {
        resp.json().then(data => {
          if (data.errors) {
            setErrors(data.errors)
          }
        })
        setPassInput('')
        setConfirmPassInput('')
      }
    })
  }

  const clearErrors = (field) => {
    if (errors[field] && errors[field].length > 0) {
      const newErrors = { ...errors }
      newErrors[field] = null
      setErrors(newErrors)
    }
  }

  const renderValidationErrors = (field) => {
    if (errors[field]) {
      return errors[field].map((error, i) => <div className='invalid-feedback' key={i}>{error}</div>)
    }
  }

  const inputStyles = (invalidCondition) => cn('form-control', { 'is-invalid': invalidCondition })
  const onInputChangeHandler = (e, setFunc, field) => {
    setFunc(e.target.value)
    clearErrors(field)
  }

  return (
    <div className='row justify-content-center'>
      <form onSubmit={onSubmitHandler} className='col-8'>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            className={inputStyles(errors.email)}
            id='email'
            placeholder='Enter email'
            value={emailInput}
            onChange={(e) => onInputChangeHandler(e, setEmailInput, 'email')}
          />
          {renderValidationErrors('email')}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className={inputStyles(errors.password)}
            id='password'
            placeholder='Password'
            value={passInput}
            onChange={(e) => onInputChangeHandler(e, setPassInput, 'password')}
          />
          {renderValidationErrors('password')}
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm password</label>
          <input
            type='password'
            className={inputStyles(errors.password_confirmation)}
            id='confirmPassword'
            placeholder='Password'
            value={confirmPassInput}
            onChange={(e) => onInputChangeHandler(e, setConfirmPassInput, 'password_confirmation')}
          />
          {renderValidationErrors('password_confirmation')}
        </div>
        <button type='submit' className='btn btn-primary float-right'>Sign up</button>
      </form>
    </div>
  )
}

export default Form
