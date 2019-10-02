import React, { useState, useEffect } from 'react'
import List from './List'
import Form from './Form'
import { makeRequest } from '../../utils/RequestUtils'

const index = () => {
  const [tasks, setTasks] = useState([])
  const [bulkToggle, setBulkToggle] = useState(false)

  const loadTasks = () => {
    makeRequest({ url: 'http://localhost:3000/api/tasks' })
      .then(data => {
        const newTasks = data.tasks.map((task, index) => {
          return { ...task, checked: false }
        })
        setTasks(newTasks)
      })
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div>
      <Form
        tasks={tasks}
        setTasks={setTasks}
        bulkToggle={bulkToggle}
        setBulkToggle={setBulkToggle}
      />
      <List tasks={tasks} setTasks={setTasks} setBulkToggle={setBulkToggle} loadTasks={loadTasks} />
    </div>
  )
}

export default index
