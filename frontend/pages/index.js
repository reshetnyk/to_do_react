import 'bootstrap/dist/css/bootstrap.min.css'
import { resetServerContext } from 'react-beautiful-dnd'
import Router from 'next/router'
import { useEffect } from 'react'

const IndexPage = () => {
  resetServerContext()

  useEffect(() => {
    Router.push('/tasks')
  })

  return (
    <>
    </>
  )
}

export default IndexPage
