import { baseURL } from '@/constants'
import { RequestError } from '@/errors'

export class BaseRequest<T> {
  constructor(private endpoint: string) {}

  private request = async (endpoint: string, options?: RequestInit) => {
    const response = await fetch(`${baseURL}${endpoint}`, options)
    const data = await response.json()
    if (!response.ok) {
      throw new RequestError({
        status: response.status,
        code: data.code,
        message: data.message
      })
    }
    return data
  }

  get = async (): Promise<T[]> => {
    return await this.request(this.endpoint)
  }

  getOne = async (id: string | number): Promise<T> => {
    return await this.request(`${this.endpoint}/${id}`)
  }

  create = async (data: Omit<T, 'id'>): Promise<number> => {
    return await this.request(this.endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  update = async (data: T & { id: string | number }): Promise<void> => {
    await this.request(`${this.endpoint}/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  delete = async (id: string | number): Promise<void> => {
    await this.request(`${this.endpoint}/${id}`, {
      method: 'DELETE'
    })
  }
}
