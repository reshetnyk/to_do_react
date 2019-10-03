import './index.css'
import { useState } from 'react'
import { makeRequest } from '../../../../utils/RequestUtils'

const Index = ({ task, tasks, setTasks }) => {
  const [inputValue, setInputValue] = useState(task.title)

  const startEditing = () => {
    if (!task.editing) {
      updateTask({ ...task, editing: true })
    }
  }

  const onDoubleClickHandler = (e) => {
    startEditing()
  }

  const onClickHandler = (e) => {
    e.stopPropagation()
  }

  const updateTask = newTask => {
    const newTasks = tasks.map(t => {
      if (t.id === newTask.id) {
        return newTask
      }
      return t
    })
    setTasks(newTasks)
  }

  const onChangeHandler = (e) => {
    setInputValue(e.target.value)
  }

  const applyChanges = () => {
    updateTask({ ...task, title: inputValue, editing: false })
    makeRequest({
      url: 'http://localhost:3000/api/tasks/' + task.id,
      method: 'put',
      data: { title: inputValue }
    })
  }

  const cancelEditing = () => {
    updateTask({ ...task, editing: false })
    setInputValue(task.title)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      applyChanges()
    } else if (e.key === 'Escape') {
      cancelEditing()
    }
  }
  const onBlurHandler = (e) => {
    cancelEditing()
  }

  return task.editing
    ? <input type='text' value={inputValue} onKeyDown={onKeyDown} onChange={onChangeHandler} onClick={onClickHandler} onBlur={onBlurHandler} autoFocus />
    : <span className='tasks__title-span' onDoubleClick={onDoubleClickHandler} onClick={onClickHandler}>{task.title}</span>
}

export default Index
