import { makeRequest } from '../../../../utils/RequestUtils'
import './index.css'

const Index = ({ task, deleteListItem }) => {
  const linkOnClick = (e) => {
    e.stopPropagation()
    makeRequest({
      url: 'http://localhost:3000/api/tasks/' + task.id,
      method: 'delete',
      data: null
    })
    deleteListItem(task.id)
  }

  return (
    <span onClick={linkOnClick} className='tasks__delete-link'>delete</span>
  )
}

export default Index
