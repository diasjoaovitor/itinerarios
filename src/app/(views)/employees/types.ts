import { TEmployeeModel } from '@/models'

export type TEmployeeFormData = Omit<
  TEmployeeModel,
  'createdAt' | 'updatedAt' | 'id'
>
