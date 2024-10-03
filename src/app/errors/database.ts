import { BaseError } from '@/classes/base-error'

export class DatabaseError extends BaseError {
  constructor({
    message,
    status,
    code
  }: {
    message?: string
    status?: number
    code: string
  }) {
    super({
      name: 'DatabaseError',
      message: message || 'Não foi possível realizar esta operação.',
      status: status || 500,
      code
    })
  }
}
