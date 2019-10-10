import { useState, useContext } from 'react'
import { makeRequest } from '../../../utils/RequestUtils'
import BulkToggleCheckbox from './BulkToggleCheckbox'
import './index.css'
import UserContext from '../../../context/UserContext'
import Router from 'next/router'

const Form = ({ tasks, setTasks, bulkToggle, setBulkToggle }) => {
  const [inputValue, setInputValue] = useState('')
  const { setAuthenticated } = useContext(UserContext)

  const formOnSubmit = (e) => {
    e.preventDefault()
    const taskTitle = inputValue
    if (taskTitle.length > 0) {
      setInputValue('')
      makeRequest({
        url: 'http://localhost:3000/api/tasks',
        method: 'post',
        data: { title: taskTitle }
      }).then(
        data => {
          setTasks([...tasks, { ...data, checked: false, editing: false }])
          setAuthenticated(true)
        },
        () => {
          setAuthenticated(false)
          Router.push('/users/sign_in')
        }
      )
    }
  }

  const inputOnChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <form onSubmit={formOnSubmit} className='pt-5'>
      <div className='input-group mb-3 tasks-form-content'>
        <div className='tasks-all-checkbox-wrap'>
          <BulkToggleCheckbox
            tasks={tasks}
            setTasks={setTasks}
            bulkToggle={bulkToggle}
            setBulkToggle={setBulkToggle}
          />
        </div>
        <input
          type='text'
          className='form-control task-title pl-5 rounded-left'
          placeholder='Task name'
          aria-label='Task name'
          aria-describedby='basic-addon2'
          value={inputValue}
          onChange={inputOnChange}
        />
        <div className='input-group-append'>
          <input className='btn btn-outline-secondary' type='submit' value='Add' />
        </div>
      </div>
    </form>
  )
}
export default Form
