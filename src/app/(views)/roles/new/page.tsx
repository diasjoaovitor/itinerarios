import { Suspense } from 'react'
import { Layout, RolesFormCreate } from '@/components'
import Loading from './loading'

const NewRole = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Layout>
        <RolesFormCreate />
      </Layout>
    </Suspense>
  )
}

export default NewRole
