import { TRequestKey } from '@/hooks'
import Loading from '@/loading'
import { EmployeeRequest } from '@/requests'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import { Suspense } from 'react'
import { Table } from './Table'

const key: TRequestKey = 'employees'

const Employees = async () => {
  const client = new QueryClient()
  const request = new EmployeeRequest()
  await client.prefetchQuery({
    queryKey: [key],
    queryFn: request.getAll
  })

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <Suspense fallback={<Loading />}>
        <Table />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Employees
