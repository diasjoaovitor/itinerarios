'use client'
import { useEffect } from 'react'
import { Form as Fm } from '@/components'
import { useMyForm, useRequest } from '@/hooks'
import { TEmployeeModel } from '@/models'
import { EmployeeRequest } from '@/requests'
import { employeeSchema } from '@/validation'
import { Fields } from '../Fields'
import { TEmployeeFormData } from '../types'
import { keys } from '../keys'

export const Form = ({ id }: { id: number }) => {
  const { useGetById, useUpdate, useDelete } =
    useRequest<TEmployeeModel>('employees')
  const request = new EmployeeRequest()

  const queryResult = useGetById({ fn: request.getById, id })
  const mutationUpdateResult = useUpdate({ fn: request.update, id })
  const mutationDeleteResult = useDelete({ fn: request.delete, id })

  const { errors, handleMyFormSubmit, reset } = useMyForm<TEmployeeFormData>({
    schema: employeeSchema,
    keys
  })

  const { data } = queryResult

  useEffect(() => {
    if (data) reset(data)
  }, [data, reset])

  const handleSubmit = async (formData: FormData) => {
    const d = await handleMyFormSubmit(formData)
    if (data && d) {
      mutationUpdateResult.mutate({
        ...data,
        ...d
      })
    }
  }

  const handleDelete = async () => {
    mutationDeleteResult.mutate(id)
  }

  return (
    <Fm
      title="Editar Funcionário"
      mode="update"
      layoutProps={{
        alert: {
          open:
            queryResult.isError ||
            mutationUpdateResult.isError ||
            mutationDeleteResult.isError,
          severity: 'error',
          title:
            (queryResult.error as Error)?.name ||
            (mutationUpdateResult.error as Error)?.name ||
            (mutationDeleteResult.error as Error)?.name
        },
        loading:
          queryResult.isLoading ||
          mutationUpdateResult.isPending ||
          mutationDeleteResult.isPending
      }}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    >
      <Fields helperText={errors.name} employee={data} />
    </Fm>
  )
}
