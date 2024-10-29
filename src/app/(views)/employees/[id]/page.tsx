import { Suspense } from 'react'
import Loading from '@/loading'
import { Form } from './Form'

const UpdateEmployee = async ({
  params: { id }
}: {
  params: { id: number }
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <Form id={id} />
    </Suspense>
  )
}

export default UpdateEmployee
