import './index.css'

const Index = ({ task, setTitle }) => {
  
  const onClickHandler = (e) => {
    e.stopPropagation()
    console.log('input on click')
  }
  const onChangeHandler = (e) => {
    setTitle(task, e.target.value)
  }

  return (
    <input type="text" readOnly={} value={task.title} onClick={onClickHandler} onChange={onChangeHandler} />
  )
}

export default Index