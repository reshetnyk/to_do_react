import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from '../Navigation'
import UserProvider from '../UserProvider'
import FlashProvider from '../FlashProvider'
const Layout = (props) => {
  return (
    <UserProvider>
      <Navigation />
      <div className='container'>
        <FlashProvider>
          {props.children}
        </FlashProvider>
      </div>
    </UserProvider>
  )
}

export default Layout
