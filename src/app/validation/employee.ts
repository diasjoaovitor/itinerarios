import * as yup from 'yup'

export const keys = ['name']

export const employeeSchema = yup.object({
  name: yup.string().required('Nome é obrigatório')
})

export const updateEmployeeSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  id: yup.number().required('ID é obrigatório')
})
