import { Suspense } from 'react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import { Layout, LinkButton, RolesTable } from '@/components'
import { getRoles } from '@/requests'
import { TRequestKey } from '@/hooks'
import Loading from './loading'

const key: TRequestKey = 'roles'

const Roles = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [key],
    queryFn: getRoles
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <Layout>
          <LinkButton href="/roles/new">Novo Cargo</LinkButton>
          <RolesTable />
        </Layout>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Roles
