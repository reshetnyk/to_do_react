import { makeRequest } from '../../../utils/RequestUtils'
import { useState, useContext } from 'react'
import Router from 'next/router'
import UserContext from '../../../context/UserContext'

const Form = () => {
  const [emailInput, setEmailInput] = useState('')
  const [passInput, setPassInput] = useState('')
  const [errors, setErrors] = useState([])
  const { setAuthenticated, setEmail } = useContext(UserContext)

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
      if (!response.errors) {
        setEmail(response.user.email)
        setAuthenticated(true)
        Router.push('/tasks')
      } else {
        setErrors(response.errors)
        setAuthenticated(false)
        setPassInput('')
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
            required
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
            required
          />
          {renderPasswordErrors()}
        </div>
        <button type='submit' className='btn btn-primary float-right'>Sign in</button>
      </form>
    </div>
  )
}

export default Form
