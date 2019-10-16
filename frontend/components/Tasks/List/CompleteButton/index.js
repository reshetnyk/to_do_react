import { makeRequest } from '../../../../utils/RequestUtils'
import UserContext from '../../../../context/UserContext'
import { useContext } from 'react'
import Router from 'next/router'
const CompleteButton = ({ tasks, setTasks, newStatus, setBulkToggle, text, className }) => {
  const { setAuthenticated } = useContext(UserContext)

  const onClickHandler = () => {
    const ids = tasks.map(t => {
      if (t.checked) {
        return t.id
      }
    })

    setTasks(oldTasks => {
      return oldTasks.map(t => {
        if (t.checked) {
          return { ...t, status: newStatus, checked: false }
        }
        return t
      })
    })

    setBulkToggle(false)

    makeRequest({
      url: 'http://localhost:3000/api/task_update_completes',
      method: 'put',
      data: { ids, status: newStatus }
    }).then(resp => {
      if (resp.status === 401) {
        setAuthenticated(false)
        Router.push('/users/sign_in')
      } else if (resp.ok) {
        setAuthenticated(true)
      }
    })
  }

  return <button onClick={onClickHandler} className={className}>{text}</button>
}

export default CompleteButton
