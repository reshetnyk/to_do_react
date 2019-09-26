import fetch from "isomorphic-unfetch";
import { useState } from "react"

const TasksForm = (props) => {
  const [inputValue, setInputValue] = useState('')
  const tasks = props.tasks
  const setTasks = props.setTasks

  const createTaskRequest = (params) => {
    fetch('http://localhost:3000/api/tasks', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(params),
    }).then((resp) => resp.json()).then(response => {
      if (response){
        console.log(response)
        setTasks([...tasks, {...response, checked: false}])
      }
    })
  }
  const formOnSubmit = (e) => {
    e.preventDefault()
    const taskTitle = inputValue
    if (taskTitle.length > 0) {
      setInputValue('')
      createTaskRequest({ title: taskTitle })
      console.log(taskTitle)
    }
  }
  const inputOnChange = (e) => {
    setInputValue(e.target.value);
  }
  return(
    <form onSubmit={formOnSubmit}>
      <div className="input-group mb-3 pt-5">
        <input
          type="text"
          className="form-control"
          placeholder="Task name"
          aria-label="Task name"
          aria-describedby="basic-addon2"
          value={inputValue}
          onChange={inputOnChange}
        />
        <div className="input-group-append">
          <input className="btn btn-outline-secondary" type="submit" value="Add"/>
        </div>
      </div>
    </form>
  )
}
export default TasksForm