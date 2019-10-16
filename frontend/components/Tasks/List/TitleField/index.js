import './index.css'
import { useState, useContext } from 'react'
import { makeRequest } from '../../../../utils/RequestUtils'
import UserContext from '../../../../context/UserContext'
import Router from 'next/router'

const TitleField = ({ task, setTasks }) => {
  const [inputValue, setInputValue] = useState(task.title)
  const { setAuthenticated } = useContext(UserContext)

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
    }).then(resp => {
      if (resp.status === 401) {
        setAuthenticated(false)
        Router.push('/users/sign_in')
      } else if (resp.ok) {
        setAuthenticated(true)
      }
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
