import RemoveLink from './RemoveLink'
import { makeRequest } from '../../../utils/RequestUtils'
import RowCheckbox from './RowCheckbox'
import './index.css'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

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

  const listItems = () => {
    return tasks.map((task, index) =>
      <Draggable draggableId={task.id} index={task.dragPosition} key={task.id}>
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
            id:{task.id},
            pos:{task.position},
            list_pos:{task.dragPosition},
             {task.title}
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
    setTasks([...updatedTasks])
    setBulkToggle(false)
  }
  const onDragEnd = (result) => {
    if(result.destination !== null){
      const taskId = result.draggableId
      const currentTaskPosition = result.source.index
      const targetPosition = result.destination.index
      // console.log('task id: ' + taskId + ', oldPosition: ' + currentTaskPosition + ', new position: ' + targetPosition)


      const dragTask = {...tasks.find(t => t.id === taskId)}
      const newTasks = tasks.map(t => ({ ...t }))
      newTasks.splice(dragTask.dragPosition, 1)
      newTasks.splice(targetPosition, 0, dragTask)
      newTasks.forEach((t, i) => {
        t.dragPosition = i
      })

      const taskToChange = tasks.find(t => t.dragPosition === targetPosition)

      // for backend
      const newPosition = taskToChange.position


      let tasksPositionsArray = newTasks.map(t => t.position)
      tasksPositionsArray.sort((a, b) => a - b)

      const newTasks2 = newTasks.map((t, i) => ({...t, position: tasksPositionsArray[i]}))
      setTasks(newTasks2)
      console.log('id=' + taskToChange.id + ', pos=' + newPosition)
      makeRequest({
        url: 'http://localhost:3000/api/task_update_positions',
        method: 'put',
        data: { id: taskId, position: newPosition }
      })
    }
  }
  return (
    <div className='tasks-list-wrap'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable1'>
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <ul className='list-group tasks-list mb-3'>{listItems()}</ul>
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={onDeleteAll} className='float-right btn btn-secondary'>delete all</button>
    </div>
  )
}
export default Index
