export interface IBaseService<T> {
  find: () => Promise<T[]>
  findOne: (id: number) => Promise<T>
  create: (data: Omit<T, 'id'>) => Promise<number>
  update: (data: T) => Promise<void>
  delete: (id: number) => Promise<void>
}
