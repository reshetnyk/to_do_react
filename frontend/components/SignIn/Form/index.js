import { makeRequest } from '../../../utils/RequestUtils'
import { useState } from 'react'
import Router from 'next/router'

const Form = () => {
  const [emailInput, setEmailInput] = useState('')
  const [passInput, setPassInput] = useState('')

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
        Router.push('/tasks')
      }
    })
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
        <button type='submit' className='btn btn-primary float-right'>Sign in</button>
      </form>
    </div>
  )
}

export default Form
