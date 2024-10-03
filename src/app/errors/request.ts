import { BaseError } from '@/classes'

export class RequestError extends BaseError {
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
      name: 'RequestError',
      message: message || 'Não foi possível realizar esta requisição.',
      status: status || 400,
      code
    })
  }
}
