import fetch from 'isomorphic-unfetch'
import React, { useState, useEffect } from 'react'
import TasksList from "./List/TasksList";
import TasksForm from "./Form/TasksForm";

const index = () =>  {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/tasks')
      .then((resp) => {
        return resp.json()
      })
      .then((resp) => {
        const newTasks = resp.tasks.map(task => {
          return { ...task, checked: false }
        })
        setTasks(newTasks)
        // console.log(newTasks)
      })
    // setTasks(resp.tasks)
  }, [])

  return (
    <div>
      <TasksForm tasks={tasks} setTasks={setTasks} />
      <TasksList tasks={tasks} setTasks={setTasks} />
    </div>
  )
}

export default index