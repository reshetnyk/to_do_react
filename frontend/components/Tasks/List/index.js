import RemoveLink from './RemoveLink'
import { makeRequest } from '../../../utils/RequestUtils'
import RowCheckbox from './RowCheckbox'
import './index.css'

const Index = ({ tasks, setTasks, setBulkToggle }) => {
  const handleRowCheckbox = (t) => {
    const updatedTasks = tasks.map(taskItem => {
      if (taskItem.id === t.id) {
        if (taskItem.checked) {
          setBulkToggle(false)
        }
        return { ...taskItem, checked: !taskItem.checked }
      }
      return taskItem
    })
    setTasks(updatedTasks)
  }

  const listItems = () => {
    return tasks.map((task, i) =>
      <li key={i} className='list-group-item tasks-list-item' onClick={() => handleRowCheckbox(task)}>
        <RowCheckbox
          task={task}
          handleRowCheckbox={handleRowCheckbox}
        />
        {task.title}
        <span className='link-wrap'>
          <RemoveLink task={task} deleteListItem={onDeleteTask} />
        </span>
      </li>
    )
  }

  const onDeleteTask = (taskId) => {
    const newTasksArray = tasks.filter(task => task.id !== taskId)
    setTasks(newTasksArray)
  }

  const onDeleteAll = () => {
    const deletedTasksIds = tasks.map(task => {
      if (task.checked) {
        return task.id
      }
    })

    makeRequest({
      url: 'http://localhost:3000/api/task_bulk_removes',
      method: 'delete',
      data: { tasks: deletedTasksIds }
    })

    const updatedTasks = tasks.filter((task) => !deletedTasksIds.includes(task.id))
    setTasks([...updatedTasks])
    setBulkToggle(false)
  }

  return (
    <div className='tasks-list-wrap'>
      <ul className='list-group tasks-list mb-3'>{listItems()}</ul>
      <button onClick={onDeleteAll} className='float-right btn btn-secondary'>delete all</button>
    </div>
  )
}
export default Index
