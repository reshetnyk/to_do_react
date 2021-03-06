const RowCheckbox = ({ task, handleRowCheckbox }) => {
  return (
    <input
      type='checkbox'
      checked={task.checked}
      onChange={() => handleRowCheckbox(task)}
      className='task-checkbox'
    />
  )
}

export default RowCheckbox
