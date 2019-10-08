import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from '../Navigation'
import { resetServerContext } from 'react-beautiful-dnd'

const Layout = (props) => {
  resetServerContext()
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
