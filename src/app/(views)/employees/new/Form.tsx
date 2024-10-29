'use client'
import { Form as Fm } from '@/components'
import { useMyForm, useRequest } from '@/hooks'
import { TEmployeeModel } from '@/models'
import { EmployeeRequest } from '@/requests'
import { employeeSchema } from '@/validation'
import { Fields } from '../Fields'
import { TEmployeeFormData } from '../types'
import { keys } from '../keys'

export const Form = () => {
  const { useCreate } = useRequest<TEmployeeModel>('employees')
  const request = new EmployeeRequest()

  const { error, isPending, mutate } = useCreate({ fn: request.create })

  const { errors, handleMyFormSubmit } = useMyForm<TEmployeeFormData>({
    schema: employeeSchema,
    keys
  })

  const handleSubmit = async (formData: FormData) => {
    const data = await handleMyFormSubmit(formData)
    if (data) {
      mutate(data)
    }
  }

  return (
    <Fm
      title="Novo Funcionário"
      mode="create"
      layoutProps={{
        alert: {
          open: !!error,
          severity: 'error',
          title: (error as Error)?.name
        },
        loading: isPending
      }}
      handleSubmit={handleSubmit}
    >
      <Fields helperText={errors.name} />
    </Fm>
  )
}
