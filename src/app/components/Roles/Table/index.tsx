import { useEffect } from 'react'
import { TDBRole } from '../../../types'
import { getRoles } from '@/requests'
import { useOpen, useRequest } from '@/hooks'
import { Loader, Table } from '../../'

export const RolesTable = () => {
  const { open, handleOpen } = useOpen()
  const { useGetAll } = useRequest<TDBRole>('roles')
  const { data, isError, isLoading } = useGetAll({ fn: getRoles })

  useEffect(() => {
    if (!isError) return
    handleOpen()
  }, [isError])

  if (isLoading) return <Loader open={true} />
  if (!data) return null

  return (
    <Table
      columns={['Cargo']}
      keys={['name']}
      data={data}
      path="roles"
      isAlertOpen={open}
    />
  )
}
