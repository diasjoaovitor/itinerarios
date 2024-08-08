import { ResultSetHeader } from 'mysql2'
import { query } from '@/infra/database'
import { TDBRole } from '@/types'

export const getRoles = async () => {
  const [result] = await query(`select * from roles order by name`)
  return result as TDBRole[]
}

export const getRole = async (id: string) => {
  const [result] = await query(`select * from roles where id = ${id}`)
  return (result as TDBRole[])[0]
}

export const addRole = async (role: TDBRole) => {
  const [result] = await query(
    `INSERT INTO roles (name, createdAt, updatedAt) VALUES ('${role.name}', '${role.createdAt}', '${role.updatedAt}')`
  )
  const { insertId } = result as ResultSetHeader
  return { ...role, id: insertId }
}

export const updateRole = async (role: TDBRole) => {
  await query(
    `UPDATE roles SET name = '${role.name}', updatedAt = '${role.updatedAt}' WHERE id = ${role.id}`
  )
  return role
}

export const deleteRole = async (id: string) => {
  await query(`DELETE FROM roles WHERE id = ${id}`)
}
