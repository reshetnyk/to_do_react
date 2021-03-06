import { makeRequest } from '../../../../utils/RequestUtils'
import './index.css'
import UserContext from '../../../../context/UserContext'
import { useContext } from 'react'
import Router from 'next/router'

const RemoveLink = ({ task, deleteListItem }) => {
  const { setAuthenticated } = useContext(UserContext)

  const linkOnClick = (e) => {
    e.stopPropagation()
    makeRequest({
      url: 'http://localhost:3000/api/tasks/' + task.id,
      method: 'delete',
      data: null
    }).then(
      () => {
        setAuthenticated(true)
      },
      () => {
        setAuthenticated(false)
        Router.push('/users/sign_in')
      }
    )
    deleteListItem(task.id)
  }

  return (
    <span onClick={linkOnClick} className='tasks__delete-link'>delete</span>
  )
}

export default RemoveLink
