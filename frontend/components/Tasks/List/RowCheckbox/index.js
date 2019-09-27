

const Index = (props) => {
  const task = props.task
  const handleRowCheckbox = props.handleRowCheckbox

  return (
    <input
      type="checkbox"
      checked={task.checked}
      onChange={() => handleRowCheckbox(task)}
      className="task-checkbox"
    />
  )

}

export default Index