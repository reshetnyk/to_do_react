import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from '../Navigation'
import UserProvider from '../UserProvider'
const Layout = (props) => {
  return (
    <UserProvider>
      <Navigation />
      <div className='container'>
        {props.children}
      </div>
    </UserProvider>
  )
}

export default Layout
