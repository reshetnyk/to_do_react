import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


const ListTasks = (props) => {
  const tasks = props.tasks
  const listItems = () => {
    return tasks.map((task, i) => <li key={i} className="list-group-item">{task}</li>)
  };

  return (
    <ul className="list-group">{listItems()}</ul>
  )
}

const IndexPage = () => {
  const [tasks, setTask] = useState([])
  const [inputValue, setInputValue] = useState('')
  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <div className={'container'}>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (inputValue.length > 0) {
          setTask([...tasks, inputValue]);
          setInputValue('')
        }
      }}>
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