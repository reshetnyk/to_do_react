import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import 'bootstrap/dist/css/bootstrap.min.css';

const ListTasks = (props) => {
  const tasks = props.tasks
  const listItems = () => {
    return tasks.map((task, i) => <li key={i} className="list-group-item">{task.title}</li>)
  };

  return (
    <ul className="list-group">{listItems()}</ul>
  )
}

const IndexPage = ({ jsonTasks }) => {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/tasks').then((resp) => {
      return resp.json()
    }).then((resp) => {
      setTasks(resp.tasks)
    })
  }, [])

  const createTaskRequest = (params) => {
    fetch('http://localhost:3000/api/tasks', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(params),
    }).then((resp) => resp.json()).then(function(response) {
      if (response){
        setTasks([...tasks, response])
      }
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (inputValue.length > 0) {
      setInputValue('')
      createTaskRequest({ title: inputValue })
    }
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <div className={'container'}>
      <form onSubmit={onSubmit}>
        <div className="input-group mb-3 pt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Task name"
            aria-label="Task name"
            aria-describedby="basic-addon2"
            value={inputValue}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <input className="btn btn-outline-secondary" type="submit" value="Add"/>
          </div>
        </div>
      </form>
      <ListTasks tasks={tasks}/>
      <style global jsx>{`
        `}</style>
    </div>
  )
}


export default IndexPage