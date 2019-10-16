import { useState, useContext } from 'react'
import { makeRequest } from '../../../utils/RequestUtils'
import FlashContext from '../../../context/FlashContext'

const Form = ({ token }) => {
  const [pass, setPass] = useState('')
  const [passConfirm, setPassConfirm] = useState('')
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
    }).then(resp => resp.json().then(data => {
      if (data.flash) {
        setMessages(data.flash)
      }
      console.log(data)
    }))
  }

  const onInputChangeHandler = (e, setFunc) => {
    setFunc(e.target.value)
  }

  return (
    <div className='row justify-content-center pt-5'>
      <form onSubmit={onSubmitHandler} className='col-8'>
        <h3 className='text-center pb-3'>Enter new password</h3>
        <div className='form-group'>
          <label htmlFor='email'>New password</label>
          <input
            className='form-control'
            id='email'
            placeholder='Enter password'
            value={pass}
            name='pass'
            onChange={(e) => onInputChangeHandler(e, setPass)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Confirm new password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Enter password'
            value={passConfirm}
            name='passConfirm'
            onChange={(e) => onInputChangeHandler(e, setPassConfirm)}
          />
        </div>
        <button type='submit' className='btn btn-success float-right'>Reset</button>
      </form>
    </div>
  )
}

export default Form
