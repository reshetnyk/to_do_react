import Tasks from '../components/Tasks'
import Layout from '../components/Layout'
import { resetServerContext } from 'react-beautiful-dnd'

const TasksPage = () => {
  resetServerContext()

  return (
    <Layout>
      <Tasks />
    </Layout>
  )
}
export default TasksPage
