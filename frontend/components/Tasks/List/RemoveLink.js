import fetch from "isomorphic-unfetch";

const RemoveLink = (props) => {
  const task = props.task
  const deleteListItem = props.deleteListItem

  const requestRemoveTask = () => {
    fetch('http://localhost:3000/api/tasks/' + task.id, {
      method: 'delete',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
      // body: JSON.stringify({tasks: tasksIds}),
    })
      .then((resp) => resp.json())
      .then(response => {
        console.log(response)
      }).catch((e) => {
        console.log(e.message)
    })
  }
  const linkOnClick = () => {
    requestRemoveTask()
    deleteListItem(task.id)
  }

  return (
      <span onClick={linkOnClick} className="fakeLink">delete
        <style jsx>{`
            .fakeLink{
              text-decoration: underline;
              cursor: pointer;
            }
          `}</style>
      </span>


  )
}

export default RemoveLink

