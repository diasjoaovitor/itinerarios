import { useEffect } from 'react'
import { TDBRole } from '@/types'
import { getTimestamp } from '@/utils'
import { useMyForm, useRequest } from '@/hooks'
import { addRole, deleteRole, getRole, updateRole } from '@/requests'
import { errorMessage } from '@/errors'
import { Form, Loader, TextField } from '../..'
import { schema } from './schema'

type TRoleFormData = Omit<TDBRole, 'createdAt' | 'updatedAt' | 'id'>

const FormFields = ({
  defaultValue,
  helperText
}: {
  defaultValue?: string
  helperText: string
}) => (
  <TextField
    label="Cargo"
    name="name"
    defaultValue={defaultValue}
    helperText={helperText}
    autoFocus
  />
)

export const RolesFormCreate = () => {
  const { errors, handleMyFormSubmit } = useMyForm<TRoleFormData>(schema)

  const { useCreate } = useRequest<TDBRole>('roles')
  const { isError, isPending, isSuccess, mutate } = useCreate({
    fn: addRole
  })

  if (isPending) return <Loader open={true} />

  const handleSubmit = async (formData: FormData) => {
    const data = await handleMyFormSubmit(formData, ['name'])
    if (!data) return
    const timestamp = getTimestamp()
    mutate({
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    })
  }

  return (
    <Form
      errorMessage={errorMessage.save}
      isFilled={false}
      isError={isError}
      isSuccess={isSuccess}
      successRedirect="/roles"
      title="Novo Cargo"
      handleSubmit={handleSubmit}
    >
      <FormFields helperText={errors.name} />
    </Form>
  )
}

export const RolesFormUpdate = ({ roleId: id }: { roleId: string }) => {
  const { errors, handleMyFormSubmit } = useMyForm<TRoleFormData>(schema)

  const { useGet, useUpdate, useDelete } = useRequest<TDBRole>('roles')
  const update = useUpdate({ id, fn: updateRole })
  const remove = useDelete({ id, fn: deleteRole })
  const load = useGet({ id, fn: getRole })

  const { data } = load

  const isPending = load.isPending || update.isPending || remove.isPending

  useEffect(() => {
    if (!data) return
    const input = document.querySelector('input[name="name"]')
    if (!input) return
    ;(input as HTMLInputElement).value = data.name
  })

  if (isPending) return <Loader open={true} />

  const isError = load.isError || update.isError || remove.isError
  const isSuccess = remove.isSuccess || update.isSuccess

  let _errorMessage = ''

  if (load.isError) _errorMessage = errorMessage.get
  if (update.isError) _errorMessage = errorMessage.save
  if (remove.isError) _errorMessage = errorMessage.delete

  const handleSubmit = async (formData: FormData) => {
    const _data = await handleMyFormSubmit(formData, ['name'])
    if (!_data || !data?.id) return
    const timestamp = getTimestamp()
    update.mutate({
      ...data,
      id: data?.id,
      ..._data,
      updatedAt: timestamp
    })
  }

  const handleDelete = () => {
    remove.mutate(id)
  }

  return (
    <Form
      errorMessage={_errorMessage}
      isFilled={true}
      isError={isError}
      isSuccess={isSuccess}
      successRedirect="/roles"
      title="Editar Cargo"
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    >
      <FormFields defaultValue={data?.name} helperText={errors.name} />
    </Form>
  )
}
