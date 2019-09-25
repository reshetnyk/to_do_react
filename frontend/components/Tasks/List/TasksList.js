import { useState } from "react"
import fetch from "isomorphic-unfetch";


const TasksList = (props) => {
  const tasks = props.tasks
  const setTasks = props.setTasks

  const [tasksForDeleting, setTasksForDeleting] = useState([])
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
    if(tasks.length === 0 ){
      return (<div></div>)
    }
    return tasks.map((task, i) =>
      <li key={i} className="list-group-item">
        <input type="checkbox" checked={task.checked} onChange={() => checkboxOnChange(task)} />
        {task.title}
      </li>
    );
  };

  const deleteAllBtnOnClick = () => {
    let tasksIds = [];
    tasks.forEach(t => {
      if(t.checked){
        tasksIds = [...tasksIds, t.id]
      }
    })
    fetch('http://localhost:3000/api/tasks', {
      method: 'delete',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({tasks: tasksIds}),
    })
      .then((resp) => resp.json())
      .then(function(response) {
        if (response){
          console.log(response);
        }
      })
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
      <button onClick={deleteAllBtnOnClick} >delete all</button>
    </div>
  )
}
export default TasksList
