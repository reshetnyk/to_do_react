import { useState, useContext } from 'react'
import { makeRequest } from '../../../utils/RequestUtils'
import FlashContext from '../../../context/FlashContext'
import cn from 'classnames'
import Link from 'next/link'
import Router from 'next/router'



const Form = ({ token }) => {
  const [pass, setPass] = useState('')
  const [passConfirm, setPassConfirm] = useState('')
  const [errors, setErrors] = useState(null)
  const { setMessages } = useContext(FlashContext)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    makeRequest({
      url: 'http://localhost:3000/api/user_reset_passwords',
      method: 'put',
      data: {
        password_reset_token: token,
        password: pass,
        password_confirmation: passConfirm
      }
    }).then(resp => {
      if (resp.ok) {
        // setMessages([{ msg: 'Password was successfully reset.', type: 'success' }])
        Router.push('/users/sign_in')
      } else {
        resp.json().then(data => {
          if (data.flash) {
            setMessages(data.flash)
          }
          if (data.errors) {
            setErrors(data.errors)
          }
        })
      }
      setPass('')
      setPassConfirm('')
    })
  }

  const clearErrors = () => {
    if (!errors) return
    setErrors(null)
  }

  const onInputChangeHandler = (e, setFunc) => {
    setFunc(e.target.value)
    clearErrors()
  }

  const renderValidationErrors = (fieldName) => {
    if (errors && errors[fieldName]) {
      return errors[fieldName].map((error, i) => <div className='invalid-feedback' key={i}>{error}</div>)
    }
  }

  const inputClasses = invalidCondition => cn('form-control', { 'is-invalid': invalidCondition })

  return (
    <div className='row justify-content-center pt-5'>
      <form onSubmit={onSubmitHandler} className='col-8'>
        <h3 className='text-center pb-3'>Enter new password</h3>
        <div className='form-group'>
          <label htmlFor='email'>New password</label>
          <input
            className={inputClasses(errors && errors.password)}
            id='email'
            placeholder='Enter password'
            value={pass}
            name='pass'
            onChange={(e) => onInputChangeHandler(e, setPass)}
          />
          {renderValidationErrors('password')}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Confirm new password</label>
          <input
            type='password'
            className={inputClasses(errors && errors.password_confirmation)}
            id='password'
            placeholder='Enter password'
            value={passConfirm}
            name='passConfirm'
            onChange={(e) => onInputChangeHandler(e, setPassConfirm)}
          />
          {renderValidationErrors('password_confirmation')}
        </div>
        {/*<Link href='/users/sign_in' as='/users/sign_in'>*/}
        {/*  <a className='btn btn-success float-right'>Reset</a>*/}
        {/*</Link>*/}
        <button type='submit' className='btn btn-success float-right'>Reset</button>
      </form>
    </div>
  )
}

export default Form
