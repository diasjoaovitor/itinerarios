import { BaseRequest } from '@/classes'
import { TBreakModel } from '@/models'

export class BreakRequest extends BaseRequest<TBreakModel> {
  constructor() {
    super('/breaks')
  }
}
