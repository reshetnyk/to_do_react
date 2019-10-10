import { useState, useEffect, useContext } from 'react'
import List from './List'
import Form from './Form'
import { makeRequest } from '../../utils/RequestUtils'
import UserContext from '../../context/UserContext'
import Router from 'next/router'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [bulkToggle, setBulkToggle] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { setAuthenticated } = useContext(UserContext)

  const loadTasks = () => {
    makeRequest({ url: 'http://localhost:3000/api/tasks' })
      .then(
        data => {
          console.log('data')
          console.log(data)
          const newTasks = data.tasks.map(task => {
            return { ...task, checked: false, editing: false }
          })
          setTasks(newTasks)
          setIsLoading(false)
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

  if (isLoading) {
    return <></>
  } else {
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
}

export default Tasks
