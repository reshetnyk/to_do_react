import { makeRequest } from '../../../utils/RequestUtils'
import { useState } from 'react'
import Router from 'next/router'

const Form = () => {
  const [emailInput, setEmailInput] = useState('')
  const [passInput, setPassInput] = useState('')
  const [confirmPassInput, setConfirmPassInput] = useState('')
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
    }).then(data => {
      if (data.errors) {
        setErrors(data.errors)
        setPassInput('')
        setConfirmPassInput('')
      } else {
        Router.push('/users/sign_in')
      }
    })
  }

  const renderEmailErrors = () => {
    if (errors.email) {
      return errors.email.map((error, i) => <div className='invalid-feedback' key={i}>{error}</div>)
    }
  }

  const renderPasswordErrors = () => {
    if (errors.password) {
      return errors.password.map((error, i) => <div className='invalid-feedback' key={i}>{error}</div>)
    }
  }

  const renderPasswordConfirmationErrors = () => {
    if (errors.password_confirmation) {
      return errors.password_confirmation.map((error, i) => <div className='invalid-feedback' key={i}>{error}</div>)
    }
  }

  return (
    <div className='row justify-content-center'>
      <form onSubmit={onSubmitHandler} className='col-8'>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className={errors.email ? 'form-control is-invalid' : 'form-control '}
            id='email'
            aria-describedby='emailHelp'
            placeholder='Enter email'
            value={emailInput}
            onChange={e => setEmailInput(e.target.value)}
          />
          {renderEmailErrors()}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className={errors.password ? 'form-control is-invalid' : 'form-control '}
            id='password'
            placeholder='Password'
            value={passInput}
            onChange={e => setPassInput(e.target.value)}
          />
          {renderPasswordErrors()}
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm password</label>
          <input
            type='password'
            className={errors.password_confirmation ? 'form-control is-invalid' : 'form-control '}
            id='confirmPassword'
            placeholder='Password'
            value={confirmPassInput}
            onChange={e => setConfirmPassInput(e.target.value)}
          />
          {renderPasswordConfirmationErrors()}
        </div>
        <button type='submit' className='btn btn-primary float-right'>Sign up</button>
      </form>
    </div>
  )
}

export default Form
