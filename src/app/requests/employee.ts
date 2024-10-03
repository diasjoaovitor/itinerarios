import { BaseRequest } from '@/classes'
import { TEmployeeModel } from '@/models'

export class EmployeeRequest extends BaseRequest<TEmployeeModel> {
  constructor() {
    super('/employees')
  }
}
