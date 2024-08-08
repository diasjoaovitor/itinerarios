import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult
} from '@tanstack/react-query'

export type TRequestKey =
  | 'roles'
  | 'employees'
  | 'breakTimes'
  | 'workingDays'
  | 'itineraries'

type TUseGetAllProps<T> = {
  fn: () => Promise<T[]>
}
export type TUseGetAll<T> = ({ fn }: TUseGetAllProps<T>) => UseQueryResult<T[]>

type TUseGetProps<T> = {
  id: string
  fn: (id: string) => Promise<T>
}
export type TUseGet<T> = ({ id, fn }: TUseGetProps<T>) => UseQueryResult<T>

type tUseCreateProps<T> = {
  fn: (item: T) => Promise<T>
}
export type TUseCreate<T> = ({
  fn
}: tUseCreateProps<T>) => UseMutationResult<T, unknown, T>

type TUseUpdateProps<T> = {
  id: string
  fn: (item: T) => Promise<T>
}
export type TUseUpdate<T> = ({
  id,
  fn
}: TUseUpdateProps<T>) => UseMutationResult<T, unknown, T>

type TUseDeleteProps = {
  id: string
  fn: (id: string) => Promise<void>
}
export type TUseDelete = ({
  id,
  fn
}: TUseDeleteProps) => UseMutationResult<void, unknown, string>

export const useRequest = <T>(requestKey: TRequestKey) => {
  const singular = requestKey.slice(0, -1)
  const key = {
    getAll: `get_${requestKey}`,
    get: `get_${singular}`,
    create: `create_${singular}`,
    update: `update_${singular}`,
    delete: `delete_${singular}`
  }

  const useGetAll: TUseGetAll<T> = ({ fn }) => {
    return useQuery({
      queryKey: [key.getAll],
      queryFn: fn
    })
  }

  const useGet: TUseGet<T> = ({ fn, id }) => {
    return useQuery({
      queryKey: [key.get, id],
      queryFn: async () => await fn(id)
    })
  }

  const useCreate: TUseCreate<T> = ({ fn }) => {
    return useMutation({
      mutationKey: [key.create],
      mutationFn: fn
    })
  }

  const useUpdate: TUseUpdate<T> = ({ id, fn }) => {
    return useMutation({
      mutationKey: [key.update, id],
      mutationFn: fn
    })
  }
  const useDelete: TUseDelete = ({ id, fn }) => {
    return useMutation({
      mutationKey: [key.delete, id],
      mutationFn: fn
    })
  }

  return { useGetAll, useGet, useCreate, useUpdate, useDelete }
}
