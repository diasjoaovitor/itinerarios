class BaseError extends Error {
  name: string
  message: string
  status: number
  code: string

  constructor({
    name,
    message,
    status,
    code
  }: {
    name: string
    message: string
    status: number
    code: string
  }) {
    super()
    this.name = name
    this.message = message
    this.status = status || 500
    this.code = code
  }
}

export class DatabaseError extends BaseError {
  constructor({ message, code }: { message?: string; code: string }) {
    super({
      name: 'DatabaseError',
      message: message || 'Não foi possível realizar esta operação.',
      status: 422,
      code
    })
  }
}
