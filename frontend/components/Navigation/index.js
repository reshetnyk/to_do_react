import Link from 'next/link'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'

const Navigation = () => {
  const { isAuthenticated, email } = useContext(UserContext)

  const renderLinks = () => {
    if (isAuthenticated) {
      return (
        <>
          <Link href='/tasks'>
            <a className='p-2 text-dark'>Tasks</a>
          </Link>
          <Link href='/users/log_out'>
            <a className='btn btn-outline-primary'>Log out</a>
          </Link>
        </>
      )
    }
    return (
      <>
        <Link href='/users/sign_up'>
          <a className='p-2 text-dark'>Sign up</a>
        </Link>
        <Link href='/users/sign_in'>
          <a className='btn btn-outline-primary'>Sign in</a>
        </Link>
      </>
    )
  }

  const renderEmail = () => {
    if (email) {
      return 'Signed as ' + email
    }
    return 'Shit'
  }

  return (
    <div
      className='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm'
    >
      <h5 className='my-0 mr-md-auto font-weight-normal'>{renderEmail()}</h5>
      <nav className='my-2 my-md-0 mr-md-3'>
        {renderLinks()}
      </nav>
    </div>
  )
}

export default Navigation
