import 'bootstrap/dist/css/bootstrap.min.css'
import Router from 'next/router'
import { useEffect } from 'react'

const IndexPage = () => {
  useEffect(() => {
    Router.push('/tasks')
  })

  return (
    <>
    </>
  )
}

export default IndexPage
