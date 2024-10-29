import { Suspense } from 'react'
import Loading from '@/loading'
import { Form } from './Form'

const NewEmployee = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <Form />
    </Suspense>
  )
}

export default NewEmployee
