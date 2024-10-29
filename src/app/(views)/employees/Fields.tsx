import { TextField } from '@/components'
import { TEmployeeModel } from '@/models'

export const Fields = ({
  employee,
  helperText
}: {
  employee?: TEmployeeModel
  helperText: string
}) => {
  return (
    <TextField
      label="Funcionário"
      name="name"
      defaultValue={employee?.name}
      helperText={helperText}
      autoFocus
    />
  )
}
