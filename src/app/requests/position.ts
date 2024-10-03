import { BaseRequest } from '@/classes'
import { TPositionModel } from '@/models'

export class PositionRequest extends BaseRequest<TPositionModel> {
  constructor() {
    super('/positions')
  }
}
