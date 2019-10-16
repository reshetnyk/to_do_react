import Layout from '../../../components/Layout'
import PasswordResetComponent from '../../../components/PasswordReset'
import { useRouter } from 'next/router'

const PasswordResetPage = () => {
  const router = useRouter()

  return (
    <Layout>
      <PasswordResetComponent token={router.query.token} />
    </Layout>
  )
}

export default PasswordResetPage
