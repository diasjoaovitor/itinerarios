import { BaseController } from '@/classes'
import { TBreakModel } from '@/models'
import { BreakRequest } from '@/requests'

export const breakController = new BaseController<TBreakModel>(
  new BreakRequest()
)
