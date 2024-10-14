import { query } from '@/query'
import { IRepository, TCreateParams, TUpdateParams } from '@/interfaces'
import { TEmployeeModel } from '@/models'
import { ResultSetHeader } from 'mysql2'

export class EmployeeRepository implements IRepository<TEmployeeModel> {
  getAll = async () => {
    const [result] = await query('SELECT * FROM employees')
    return result as TEmployeeModel[]
  }

  getById = async (id: number) => {
    const [result] = await query('SELECT * FROM employees WHERE id = ?', [id])
    return (result as TEmployeeModel[])[0]
  }

  create = async ({ name }: TCreateParams<TEmployeeModel>) => {
    const [result] = await query('INSERT INTO employees SET name = ?', [name])
    return (result as ResultSetHeader).insertId
  }

  update = async ({ id, name }: TUpdateParams<TEmployeeModel>) => {
    await query('UPDATE employees SET name = ? WHERE id = ?', [name, id])
  }

  delete = async (id: number) => {
    await query('DELETE FROM employees WHERE id = ?', [id])
  }
}
