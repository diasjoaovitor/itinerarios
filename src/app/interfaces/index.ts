export type TCreateParams<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
export type TUpdateParams<T> = Omit<T, 'createdAt' | 'updatedAt'> & {
  id: number
}

export interface IRepository<T> {
  getAll(): Promise<T[]>
  getById(id: number): Promise<T | null>
  create(data: TCreateParams<T>): Promise<number>
  update(data: TUpdateParams<T>): Promise<void>
  delete(id: number): Promise<void>
}
