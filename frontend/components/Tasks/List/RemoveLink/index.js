import { makeRequest } from '../../../../utils/RequestUtils'
import './index.css'

const Index = (props) => {
  const task = props.task
  const deleteListItem = props.deleteListItem

  const linkOnClick = (e) => {
    e.stopPropagation()
    makeRequest({
      url: 'http://localhost:3000/api/tasks/' + task.id,
      method: 'delete',
      data: null
    })
    console.log(task)
    deleteListItem(task.id)
  }

  return (
      <span onClick={linkOnClick} className="fakeLink">delete</span>
  )
}

export default Index

