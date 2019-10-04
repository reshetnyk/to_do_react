import Link from 'next/link'

const Navigation = () => {
  return (
    <div
      className='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm'
    >
      <h5 className='my-0 mr-md-auto font-weight-normal'>Shit</h5>
      <nav className='my-2 my-md-0 mr-md-3'>
        <Link href='/users/sign_up'>
          <a className='p-2 text-dark'>Sign up</a>
        </Link>
        <Link href='/tasks'>
          <a className='p-2 text-dark'>Tasks</a>
        </Link>
      </nav>
      <Link href='/users/sign_in'>
        <a className='btn btn-outline-primary'>Sign in</a>
      </Link>
    </div>
  )
}

export default Navigation
