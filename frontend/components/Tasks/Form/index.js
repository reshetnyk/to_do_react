import { useState } from 'react'
import { makeRequest } from '../../../utils/RequestUtils'
import BulkToggleCheckbox from './BulkToggleCheckbox'
import './index.css'

const Index = ({ tasks, setTasks, bulkToggle, setBulkToggle }) => {
  const [inputValue, setInputValue] = useState('')

  const formOnSubmit = (e) => {
    e.preventDefault()
    const taskTitle = inputValue
    if (taskTitle.length > 0) {
      setInputValue('')
      makeRequest({
        url: 'http://localhost:3000/api/tasks',
        method: 'post',
        data: { title: taskTitle }
      }).then(data => {
        setTasks([...tasks, { ...data, checked: false, editing: false }])
      })
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
export default Index
