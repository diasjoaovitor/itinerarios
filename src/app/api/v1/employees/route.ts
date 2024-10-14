import { ApiService } from '@/services'
import { TEmployeeModel } from '@/models'
import { EmployeeRepository } from '@/repositories'

const api = new ApiService<TEmployeeModel>(new EmployeeRepository())

export const { GET, POST } = api
