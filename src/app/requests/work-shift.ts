import { BaseRequest } from '@/classes'
import { TWorkShiftModel } from '@/models'

export class WorkShiftRequest extends BaseRequest<TWorkShiftModel> {
  constructor() {
    super('/work-shifts')
  }
}
