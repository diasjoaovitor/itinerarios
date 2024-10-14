import { RequestService } from '@/services'
import { TEmployeeModel } from '@/models'

export class EmployeeRequest extends RequestService<TEmployeeModel> {
  constructor() {
    super('/employees')
  }
}
