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
