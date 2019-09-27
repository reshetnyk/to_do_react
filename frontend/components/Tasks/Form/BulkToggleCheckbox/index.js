import './index.css'

const Index = (props) => {
  const tasks = props.tasks
  const setTasks = props.setTasks
  const bulkToggle = props.bulkToggle
  const setBulkToggle = props.setBulkToggle

  const selectAllOnChange = () => {
    const oldValue = bulkToggle
    setBulkToggle(!oldValue)
    toggleAllChecks(!oldValue)
  }

  const toggleAllChecks = (checkState) => {
    const updatedTasks = tasks.map(task => {
      return {...task, checked: checkState}
    })
    setTasks(updatedTasks)
  }

  return (
    <input type="checkbox" checked={bulkToggle} onChange={selectAllOnChange} />
  )
}

export default Index