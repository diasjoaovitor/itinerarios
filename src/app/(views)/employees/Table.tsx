'use client'
import { Table as Tb } from '@/components'
import { useRequest } from '@/hooks'
import { EmployeeRequest } from '@/requests'
import { keys } from './keys'

export const Table = () => {
  const { useGetAll } = useRequest('employees')
  const request = new EmployeeRequest()
  const { data, error, isError, isLoading } = useGetAll({ fn: request.getAll })

  return (
    <Tb
      columns={['Funcionários']}
      data={data || []}
      keys={keys}
      layoutProps={{
        alert: { open: isError, severity: 'error', title: error?.name || '' },
        loading: isLoading
      }}
      path="employees"
      text="Novo Funcionário"
    />
  )
}
