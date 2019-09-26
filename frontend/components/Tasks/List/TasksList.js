import { useState } from "react"
import fetch from "isomorphic-unfetch";
import RemoveLink from "./RemoveLink";
import { makeRequest } from '../../../utils/RequestUtils'

const TasksList = (props) => {
  const tasks = props.tasks
  const setTasks = props.setTasks

  const [selectAllValue, setSelectAllValue] = useState(false)

  const checkboxOnChange = (t) => {
    const updatedTasks = tasks.map(task => {
      if(task.id === t.id) {
        if(task.checked) {
          setSelectAllValue(false)
        }
        return {...task, checked: !task.checked}
      } else{
        return {...task}
      }
    })
    setTasks(updatedTasks)
  }

  const listItems = () => {
    return tasks.map((task, i) =>
      <li key={i} className="list-group-item">
        <input type="checkbox" checked={task.checked} onChange={() => checkboxOnChange(task)} />
        {task.title}
        <RemoveLink task={task} deleteListItem={deleteListItem} />
      </li>
    )
  }
  const deleteListItem = (taskId) => {
    const newTasksArray = tasks.filter(task => task.id !== taskId)
    setTasks(newTasksArray)
    console.log('delete')
    console.log(newTasksArray)
  }

  const deleteAllBtnOnClick = () => {
    const deletedTasksIds = tasks.map(task => {
      if(task.checked){
        return task.id
      }
    })

    const data = makeRequest({
      url: 'http://localhost:3000/api/task_bulk_removes',
      method: 'delete',
      data: { tasks: deletedTasksIds }
    }).then(data => console.log(data))


    const updatedTasks = tasks.filter((task) => !deletedTasksIds.includes(task.id))
    setTasks([...updatedTasks])
    setSelectAllValue(false)
  }

  const toggleAllChecks = (checkState) => {
    const updatedTasks = tasks.map(task => {
      return {...task, checked: checkState}
    })
    setTasks(updatedTasks)
  }

  const selectAllOnChange = () => {
    const oldValue = selectAllValue
    setSelectAllValue(!oldValue)
    toggleAllChecks(!oldValue)
  }

  return (
    <div>
      <input type="checkbox" checked={selectAllValue} onChange={selectAllOnChange} />
      <ul className="list-group">{listItems()}</ul>
      <button onClick={deleteAllBtnOnClick}>delete all</button>
    </div>
  )
}
export default TasksList
