import { useEffect, useContext } from 'react'
import { makeRequest } from '../../utils/RequestUtils'
import Router from 'next/router'
import UserContext from '../../context/UserContext'

const LogOut = () => {
  const { setAuthenticated, deleteEmail } = useContext(UserContext)

  useEffect(() => {
    makeRequest({
      url: 'http://localhost:3000/api/sessions',
      method: 'delete'
    }).then(resp => {
      if (resp.status === 401) {
        Router.push('/users/sign_in')
      } else if (resp.ok) {
        setAuthenticated(false)
        deleteEmail()
        Router.push('/users/sign_in')
      }
    })
  }, [])

  return <></>
}

export default LogOut
