import './index.css'

const Index = ({ tasks, setTasks, bulkToggle, setBulkToggle }) => {
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
    <input type='checkbox' checked={bulkToggle} onChange={selectAllOnChange} />
  )
}

export default Index