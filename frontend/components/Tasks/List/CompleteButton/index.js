import { makeRequest } from '../../../../utils/RequestUtils'

const CompleteButton = ({ tasks, setTasks, newStatus, setBulkToggle, text, className }) => {
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
    })
  }

  return <button onClick={onClickHandler} className={className}>{text}</button>
}

export default CompleteButton
