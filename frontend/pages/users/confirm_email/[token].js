import Router, { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeRequest } from '../../../utils/RequestUtils'
import UserContext from '../../../context/UserContext'

const ConfirmEmail = () => {
  const router = useRouter()
  const [isRequestSent, setIsRequestSent] = useState(false)
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const { isAuthenticated } = useContext(UserContext)

  useEffect(() => {
    if (isRequestSent || isAuthenticated) return
    makeRequest({
      url: 'http://localhost:3000/api/user_confirm_emails',
      method: 'put',
      data: { confirm_token: router.query.token }
    }).then(resp => {
      if (resp.ok) {
        setIsRequestSuccessful(true)
        setRedirectionTimer()
      } else {
        resp.json().then(data => {
          if (data.error) setErrorMsg(data.error)
        })
      }
      setIsRequestSent(true)
    })
  }, [])

  const renderMessage = () => {
    if (isRequestSuccessful) {
      return (
        <div className='alert alert-success' role='alert'>
          Email has successfully confirmed. Redirecting to sign in page in few secs.
        </div>
      )
    }

    return (
      <div className='alert alert-danger' role='alert'>
        {errorMsg}
      </div>
    )
  }

  const setRedirectionTimer = () => {
    setTimeout(() => {
      Router.push('/users/sign_in')
    }, 5000)
  }

  const renderLoading = () => {
    return (
      <>
        <div className='text-center pt-5'>
          <div className='spinner-border text-center' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
          <span className='d-block'>Confirmation</span>
        </div>
      </>
    )
  }
  return (
    <div className='container'>
      {isRequestSent ? renderMessage() : renderLoading()}
    </div>
  )
}
ConfirmEmail.getInitialProps = async () => {
  return {}
}

export default ConfirmEmail
