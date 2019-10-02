import RemoveLink from './RemoveLink'
import { makeRequest } from '../../../utils/RequestUtils'
import RowCheckbox from './RowCheckbox'
import './index.css'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import EditableLabel from './EditableLabel'

const Index = ({ tasks, setTasks, setBulkToggle, loadTasks }) => {
  const handleRowCheckbox = (t) => {
    const updatedTasks = tasks.map(taskItem => {
      if (taskItem.id === t.id) {
        if (taskItem.checked) {
          setBulkToggle(false)
        }
        return { ...taskItem, checked: !taskItem.checked }
      }
      return taskItem
    })

    setTasks(updatedTasks)
  }
  const setTitle = (task, newTitle) => {
    const newTasks = tasks.map(t => {
      if(task.id === t.id){
        return {...t, title: newTitle}
      }
      return {...t}
    })
    setTasks(newTasks)
  }

  const listItems = () => {
    return tasks.map((task) =>
      <Draggable draggableId={task.id} index={task.position - 1} key={task.id}>
        {(provided) => (
          <li
            className='list-group-item tasks-list-item'
            onClick={() => handleRowCheckbox(task)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <RowCheckbox
              task={task}
              handleRowCheckbox={handleRowCheckbox}
            />
            <EditableLabel task={task} setTitle={setTitle} />
            {/*{task.title}*/}
            <span className='link-wrap'>
              <RemoveLink task={task} deleteListItem={onDeleteTask} />
            </span>
          </li>
        )}
      </Draggable>
    )
  }

  const onDeleteTask = (taskId) => {
    const newTasksArray = tasks.filter(task => task.id !== taskId)
    newTasksArray.forEach((task, i) => {
      task.position = i + 1
    })
    setTasks(newTasksArray)
  }

  const onDeleteAll = () => {
    const deletedTasksIds = tasks.map(task => {
      if (task.checked) {
        return task.id
      }
    })

    makeRequest({
      url: 'http://localhost:3000/api/task_bulk_removes',
      method: 'delete',
      data: { tasks: deletedTasksIds }
    })

    const updatedTasks = tasks.filter((task) => !deletedTasksIds.includes(task.id))
    updatedTasks.forEach((task, i) => {
      task.position = i + 1
    })

    setTasks([...updatedTasks])
    setBulkToggle(false)
  }

  const reorderTasks = (indexFrom, indexWhere) => {
    const newTasks = [...tasks]
    newTasks.splice(indexFrom, 1)
    newTasks.splice(indexWhere, 0, { ...tasks[indexFrom] })
    newTasks.forEach((t, i) => {
      t.position = i + 1
    })
    return newTasks
  }

  const onDragEnd = (result) => {
    if (result.destination === null || result.source.index === result.destination.index) {
      return
    }

    setTasks(reorderTasks(result.source.index, result.destination.index))
    makeRequest({
      url: 'http://localhost:3000/api/task_update_positions',
      method: 'put',
      data: { id: result.draggableId, position: result.destination.index + 1 }
    })
  }

  return (
    <div className='tasks-list-wrap'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable1'>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <ul className='list-group tasks-list mb-3'>{listItems()}</ul>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={onDeleteAll} className='float-right btn btn-secondary'>delete all</button>
    </div>
  )
}
export default Index
