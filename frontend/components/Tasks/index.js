import { useState, useEffect, useContext } from 'react'
import List from './List'
import Form from './Form'
import { makeRequest } from '../../utils/RequestUtils'
import UserContext from '../../context/UserContext'
import Router from 'next/router'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [bulkToggle, setBulkToggle] = useState(false)
  const { setAuthenticated } = useContext(UserContext)

  const loadTasks = () => {
    makeRequest({ url: 'http://localhost:3000/api/tasks' })
      .then(
        data => {
          const newTasks = data.tasks.map(task => {
            return { ...task, checked: false, editing: false }
          })
          setTasks(newTasks)
          setAuthenticated(true)
        },
        () => {
          setAuthenticated(false)
          Router.push('/users/sign_in')
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
      <List tasks={tasks} setTasks={setTasks} setBulkToggle={setBulkToggle} />
    </div>
  )
}

export default Tasks
