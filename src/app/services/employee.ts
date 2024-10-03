import { ResultSetHeader } from 'mysql2'
import { query } from '@/infra'
import { TEmployeeModel } from '@/models'

export class EmployeeService {
  find = async () => {
    const [result] = await query('SELECT * FROM employees')
    return result
  }

  findOne = async (id: number) => {
    const [result] = await query('SELECT * FROM employees WHERE id = ?', [id])
    if (!result) return null
    return (result as TEmployeeModel[])[0]
  }

  create = async ({
    createdAt,
    name,
    updatedAt
  }: Omit<TEmployeeModel, 'id'>) => {
    const [result] = await query(
      'INSERT INTO employees (name, createdAt, updatedAt) VALUES (?, ?, ?)',
      [name, createdAt, updatedAt]
    )
    const { insertId } = result as ResultSetHeader
    return insertId
  }

  update = async ({ id, name, updatedAt }: TEmployeeModel) => {
    await query('UPDATE employees SET name = ?, updatedAt = ? WHERE id = ?', [
      name,
      updatedAt,
      id
    ])
  }

  delete = async (id: number) => {
    await query('DELETE FROM employees WHERE id = ?', [id])
  }
}
