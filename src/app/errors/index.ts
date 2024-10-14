export class BaseError extends Error {
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
    this.status = status
    this.code = code
  }
}

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

export class NotFoundError extends BaseError {
  constructor({
    message,
    status,
    code
  }: {
    message?: string
    status?: number
    code?: string
  }) {
    super({
      name: 'NotFoundError',
      message: message || 'Registro não encontrado.',
      status: status || 404,
      code: code || 'not-found'
    })
  }
}

export class ValidationError extends BaseError {
  constructor({
    message,
    status,
    code
  }: {
    message?: string
    status?: number
    code?: string
  }) {
    super({
      name: 'ValidationError',
      message: message || 'Dados inválidos.',
      status: status || 400,
      code: code || 'invalid-data'
    })
  }
}

export class RequestError extends BaseError {
  constructor({
    name,
    message,
    status,
    code
  }: {
    name?: string
    message?: string
    status?: number
    code: string
  }) {
    super({
      name: name || 'RequestError',
      message: message || 'Não foi possível realizar esta requisição.',
      status: status || 400,
      code
    })
  }
}
