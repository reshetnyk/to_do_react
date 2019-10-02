import 'bootstrap/dist/css/bootstrap.min.css'
import Tasks from '../components/Tasks'
import { resetServerContext } from 'react-beautiful-dnd'

const IndexPage = () => {
  resetServerContext()
  return (
    <div className='container'>
      <Tasks />
    </div>
  )
}

export default IndexPage
