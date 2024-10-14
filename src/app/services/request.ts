import { baseURL } from '@/constants'
import { RequestError } from '@/errors'
import { IRepository, TCreateParams, TUpdateParams } from '@/interfaces'

export class RequestService<T> implements IRepository<T> {
  constructor(private endpoint: string) {}

  private handler = async (endpoint: string, options?: RequestInit) => {
    const response = await fetch(`${baseURL}/${endpoint}`, options)
    const data = await response.json()
    if (!response.ok) {
      throw new RequestError(data)
    }
    return data
  }

  getAll = async (): Promise<T[]> => {
    return await this.handler(this.endpoint)
  }

  getById = async (id: string | number): Promise<T | null> => {
    return await this.handler(`${this.endpoint}/${id}`)
  }

  create = async (body: TCreateParams<T>): Promise<number> => {
    return await this.handler(this.endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }

  update = async (body: TUpdateParams<T>): Promise<void> => {
    await this.handler(`${this.endpoint}/${body.id}`, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }

  delete = async (id: number): Promise<void> => {
    await this.handler(`${this.endpoint}/${id}`, {
      method: 'DELETE'
    })
  }
}
