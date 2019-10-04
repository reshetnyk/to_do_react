import './index.css'
import { useState } from 'react'
import { makeRequest } from '../../../../utils/RequestUtils'

const TitleField = ({ task, setTasks }) => {
  const [inputValue, setInputValue] = useState(task.title)

  const onDoubleClickHandler = (e) => {
    if (!task.editing) {
      updateTask({ ...task, editing: true })
    }
  }

  const onClickHandler = (e) => {
    e.stopPropagation()
  }

  const updateTask = newTask => {
    setTasks(oldTasks => {
      return oldTasks.map(t => {
        if (t.id === newTask.id) {
          return newTask
        }
        return { ...t }
      })
    })
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

export default TitleField
