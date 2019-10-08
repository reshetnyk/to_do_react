import { makeRequest } from '../../../utils/RequestUtils'
import { useState } from 'react'

const Form = () => {
  const [emailInput, setEmailInput] = useState('')
  const [passInput, setPassInput] = useState('')
  const [confirmPassInput, setConfirmPassInput] = useState('')

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
    }).then(response => console.log(response))
  }

  return (
    <div className='row justify-content-center'>
      <form onSubmit={onSubmitHandler} className='col-8'>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='email'
            aria-describedby='emailHelp'
            placeholder='Enter email'
            value={emailInput}
            onChange={e => setEmailInput(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Password'
            value={passInput}
            onChange={e => setPassInput(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm password</label>
          <input
            type='password'
            className='form-control'
            id='confirmPassword'
            placeholder='Password'
            value={confirmPassInput}
            onChange={e => setConfirmPassInput(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary float-right'>Sign up</button>
      </form>
    </div>
  )
}

export default Form
