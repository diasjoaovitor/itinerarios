import { Suspense } from 'react'
import { Layout, RolesFormUpdate } from '@/components'
import Loading from './loading'

const Role = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Layout>
        <RolesFormUpdate roleId={id} />
      </Layout>
    </Suspense>
  )
}

export default Role
