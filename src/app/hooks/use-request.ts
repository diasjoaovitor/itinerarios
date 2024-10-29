import { TCreateParams, TUpdateParams } from '@/interfaces'
import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

type TUseGetAllProps<T> = {
  fn: () => Promise<T[]>
}
type TUseGetAll<T> = ({ fn }: TUseGetAllProps<T>) => UseQueryResult<T[]>

type TUseGetByIdProps<T> = {
  id: number
  fn: (id: number) => Promise<T | null>
}
type TUseGetById<T> = ({ id, fn }: TUseGetByIdProps<T>) => UseQueryResult<T>

type TUseCreateProps<T> = {
  fn: (item: T) => Promise<number>
}
type TUseCreate<T> = ({
  fn
}: TUseCreateProps<T>) => UseMutationResult<number, unknown, T>

type TUseUpdateProps<T> = {
  id: number
  fn: (item: T) => Promise<void>
}
type TUseUpdate<T> = ({
  id,
  fn
}: TUseUpdateProps<T>) => UseMutationResult<void, unknown, T>

type TUseDeleteProps = {
  id: number
  fn: (id: number) => Promise<void>
}
type TUseDelete = ({
  id,
  fn
}: TUseDeleteProps) => UseMutationResult<void, unknown, number>

export type TRequestKey =
  | 'employees'
  | 'positions'
  | 'workShifts'
  | 'breaks'
  | 'itineraries'

export const useRequest = <T>(requestKey: TRequestKey) => {
  const singular =
    requestKey.slice(-3, requestKey.length) === 'ies'
      ? `${requestKey.slice(0, -3)}y`
      : requestKey.slice(0, -1)
  const key = {
    getAll: `get_${requestKey}`,
    get: `get_${singular}`,
    create: `create_${singular}`,
    update: `update_${singular}`,
    delete: `delete_${singular}`
  }

  const router = useRouter()

  const onSuccess = () => {
    router.back()
  }

  const useGetAll: TUseGetAll<T> = ({ fn }) => {
    return useQuery({
      queryKey: [key.getAll],
      queryFn: fn
    })
  }

  const useGetById: TUseGetById<T> = ({ fn, id }) => {
    return useQuery({
      queryKey: [key.get, id],
      queryFn: async () => await fn(id),
      enabled: !!id
    })
  }

  const useCreate: TUseCreate<TCreateParams<T>> = ({ fn }) => {
    return useMutation({
      mutationKey: [key.create],
      mutationFn: fn,
      onSuccess
    })
  }

  const useUpdate: TUseUpdate<TUpdateParams<T>> = ({ id, fn }) => {
    return useMutation({
      mutationKey: [key.update, id],
      mutationFn: fn,
      onSuccess
    })
  }

  const useDelete: TUseDelete = ({ id, fn }) => {
    return useMutation({
      mutationKey: [key.delete, id],
      mutationFn: fn,
      onSuccess
    })
  }

  return { useGetAll, useGetById, useCreate, useUpdate, useDelete }
}
