import { TDBRole } from '../types'
import { request } from './request'

export const getRoles = async () => {
  return request('/roles') as Promise<TDBRole[]>
}

export const getRole = async (id: string) => {
  return request(`/roles/${id}`) as Promise<TDBRole>
}

export const addRole = async (role: TDBRole) => {
  return request('/roles', {
    method: 'POST',
    body: JSON.stringify(role)
  }) as Promise<TDBRole>
}

export const updateRole = async (role: TDBRole) => {
  return request('/roles', {
    method: 'PUT',
    body: JSON.stringify(role)
  }) as Promise<TDBRole>
}

export const deleteRole = async (id: string) => {
  await request(`/roles/${id}`, {
    method: 'DELETE'
  })
}
