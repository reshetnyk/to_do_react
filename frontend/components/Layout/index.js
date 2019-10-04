import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from '../Navigation'

const Layout = (props) => {
  return (
    <>
      <Navigation />
      <div className='container'>
        {props.children}
      </div>
    </>
  )
}

export default Layout
